import { Component, OnInit } from '@angular/core';
import { Invoice } from '@core/interfaces';
import { Column, ColumnType, OperationEvent, OptionSettings } from '@core/lib/dynamic-table/utils/interfaces';
import { ApiHelperService, LoadingService, RequestService } from '@core/services';
import { delay } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceInfoComponent } from '@core/components/invoice-info/invoice-info.component';

@Component({
  selector: 'app-multiple-invoices',
  templateUrl: './multiple-invoices.component.html',
  styleUrls: ['./multiple-invoices.component.scss']
})
export class MultipleInvoicesComponent implements OnInit {

  public data: Invoice[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.invoice_number',
      header: 'NUmber',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.title',
      header: 'Titel',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.date',
      header: 'Datum',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.delivery_date',
      header: 'Lieferdatum',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.a25',
      header: '§25a',
      show: true,
      type: ColumnType.Boolean
    },
    {
      column: 'attributes.iva',
      header: 'inkl. MwSt.',
      show: true,
      type: ColumnType.Boolean
    }
  ];
  public OptionSettings: OptionSettings = {
    options: [
      {
        icon: 'picture_as_pdf',
        literal: 'PDF exportieren',
        event: 'ExportPdf'
      },
      {
        icon: 'info',
        literal: 'Detail anzeigen',
        event: 'Detail'
      }
    ]
  };
  public filterQuery: string = '';
  public loading: boolean = false;
  public noShowLoader = true;
  public pageCount: number = 100;
  public currentPage: number = 1;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    this.noShowLoader = false;
    this.loadPaginatedData(this.currentPage);
  }

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => this.loading = loading);

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page'))
        this.currentPage = <number><unknown>map.get('page');
    });
  }

  public loadPaginatedData = ($event: number) => {
    this.currentPage = $event;
    this.requestService.Get(this.apiHelperService.invoicesURL, this.query())
      .subscribe(res => {
        this.data = res.data;
        this.pageCount = res.meta.pagination.pageCount;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: this.currentPage },
          queryParamsHandling: 'merge',
        });
        this.noShowLoader = true;
      });
  }

  public catchEvent($event: OperationEvent) {
    switch ($event.type) {
      case 'ExportPdf':
        this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
          type: ExportType.invoice,
          invoiceId: $event.value.id
        }).subscribe(res => {
          const year = moment(($event.value as Invoice).attributes.createdAt).year();
          const month = moment(($event.value as Invoice).attributes.createdAt).format('MMMM');
          saveAs(new Blob([res], { type: 'application/pdf' }),
            `Rechnung [${ month }, ${ year }] (${ moment().format('YYYY-MM-DD') }).pdf`);
        });
        break;
      case 'Detail':
        this.requestService.Get(
          `${ this.apiHelperService.invoicesURL }/${ $event.value.id }`,
          this.queryInvoice()
        ).subscribe(res => {
          this.matDialog.open(InvoiceInfoComponent, {
            width: '580px',
            height: '480px',
            data: <Invoice>res.data,
            backdropClass: 'modal-backdrop'
          });
        });
        break;
      default:
        break;
    }
  }

  private query = () => this.requestService.generateQuery({
    'pagination[pageSize]': 10,
    'pagination[page]': this.currentPage
  });

  private queryInvoice = () => this.requestService.generateQuery({
    populate: ['client']
  });

}
