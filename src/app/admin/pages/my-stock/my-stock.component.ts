import { Component, OnInit } from '@angular/core';
import { Car, FilterDeepOption } from '@core/interfaces';
import { ApiHelperService, AuthService, LoadingService, NotificationService, RequestService } from '@core/services';
import { Column, ColumnType, OperationEvent } from '@core/lib/dynamic-table/utils/interfaces';
import { OptionSettings } from 'src/app/core/lib/dynamic-table/utils/interfaces/option-settings';
import { delay } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';
import { MatDialog } from '@angular/material/dialog';
import { VehicleInfoComponent } from '@core/components/vehicle-info/vehicle-info.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RemoveConfirmationComponent } from '@core/components/remove-confirmation/remove-confirmation.component';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { ExportType } from '@core/services/request.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-my-stock',
  templateUrl: './my-stock.component.html',
  styleUrls: ['./my-stock.component.scss']
})
export class MyStockComponent implements OnInit {

  public data: Car[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.name',
      header: 'Fahrzeugname',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.car_identifier',
      header: 'FIN',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.first_register_date',
      header: 'Erstzulassung',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.kilometres',
      header: 'Kilometer',
      show: true,
      type: ColumnType.Extra,
      prop: 'Km'
    },
    {
      column: 'attributes.kilowatt',
      header: 'Kilowatt',
      show: true,
      type: ColumnType.Extra,
      prop: 'Kw'
    },
    {
      column: 'attributes.build_variant',
      header: 'Aufbauvariante',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.hsn',
      header: 'HSN',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.color',
      header: 'Farbe',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.buy.buy_date',
      header: 'Einkaufdatum',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.buy.net_buy',
      header: 'Einakuf Netto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'attributes.buy.gross_buy',
      header: 'Einkauf Brutto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'attributes.sell.invoice_date',
      header: 'Verkaufsdatum',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.sell.net_sell',
      header: 'Verkauf Netto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'attributes.sell.gross_sell',
      header: 'Verkauf Brutto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'net_profit',
      header: 'Netto Gewinn',
      show: true,
      type: ColumnType.Currency
    }
  ];
  public OptionSettings: OptionSettings = {
    options: [
      {
        icon: 'info',
        literal: 'Detail anzeigen',
        event: 'Detail'
      },
      {
        icon: 'edit',
        literal: 'Bearbeiten',
        event: 'Edit'
      },
      {
        icon: 'shopping_cart',
        literal: 'kaufen Verkaufen',
        event: 'Buy_Sell'
      },
      {
        icon: 'delete',
        literal: 'Löschen',
        event: 'Remove'
      }
    ]
  };
  public filterQuery: string = '';
  public loading: boolean = false;
  public noShowLoader = true;
  public currentPage: number = 1;
  public pageCount: number = 100;
  public year: number | undefined;
  public month: { label: string, value: string } = {
    label: moment().format('MMMM'),
    value: `${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }`
  };
  public months: { label: string, value: string }[] = environment.months.map((month, index) => ({
    label: month,
    value: index + 1 < 10 ? `0${ index + 1 }` : `${ index + 1 }`
  }));
  public years = Array.from({ length: 6 }, (v, i) => moment().year() - 6 + i + 1);
  public extraOption: { event: string, icon: string } = { event: 'TO_DETAIL', icon: 'chevron_right' };
  private currentUserId: number | undefined;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    this.authService.currentUser.subscribe(user => this.currentUserId = user?.id);
    this.noShowLoader = false;
    this.loadPaginatedData(this.currentPage);
  }

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => this.loading = loading);

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page')) this.currentPage = <number><unknown>map.get('page');
    });
  }

  public loadPaginatedData = ($event: number) => {
    this.currentPage = $event;
    this.requestService.Get(this.apiHelperService.carsURL, this.query())
      .subscribe(res => {
        this.data = res.data2.map((elm: any) => ({
          ...elm,
          net_profit: elm.attributes.sell?.net_sell - elm.attributes.buy?.net_buy,
          net_iva: elm.attributes.sell?.iva_sell - elm.attributes.buy?.iva_buy
        }));
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
      case 'Detail':
        this.requestService.Get(`${ this.apiHelperService.carsURL }/${ $event.value.id }`).subscribe(res => {
          this.matDialog.open(VehicleInfoComponent, {
            width: '580px',
            height: '480px',
            data: <Car>res.data,
            backdropClass: 'modal-backdrop'
          });
        });
        break;
      case 'Edit':
        this.router.navigate(['/admin/vehicle-form', $event.value.id], { queryParams: { tab: 1 } });
        break;
      case 'Buy_Sell':
        this.router.navigate(['/admin/vehicle-form', $event.value.id], { queryParams: { tab: 2 } });
        break;
      case 'Remove':
        this.matDialog.open(RemoveConfirmationComponent, {
          data: 'Möchten Sie das ausgewählte Fahrzeug wirklich löschen?',
          backdropClass: 'modal-backdrop'
        }).afterClosed().subscribe(out => {
          if (out) {
            this.requestService.Delete(`${ this.apiHelperService.carsURL }/${ $event.value.id }`)
              .subscribe(() => {
                this.loadPaginatedData(this.currentPage);
                this.notificationService.riseNotification({ color: 'success', data: 'Fahrzeug erfolgreich entfernt' });
              });
          }
        });
        break;
      case 'TO_DETAIL':
        this.router.navigate(['/admin/vehicle-form', $event.value.id], { queryParams: { tab: 1 } });
        break;
      default:
        break;
    }
  }

  public generatePdf() {
    const baseDate = `${ this.year ?? moment().year() }-${ this.month.value }`;
    this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
      type: ExportType.stock,
      page: this.currentPage,
      pageSize: 10,
      beginDate: `${ baseDate }-01`,
      endDate: `${ baseDate }-${ moment(baseDate, 'YYYY-MM').daysInMonth() }`
    }).subscribe(res => {
      saveAs(new Blob([res], { type: 'application/pdf' }),
        `report_${ ExportType.stock } [${ this.month.label }, ${ this.year ?? moment().year() }] (${ moment().format('YYYY-MM-DD') }).pdf`);
    });
  }

  private query = () => this.requestService.generateQuery({
    'pagination[pageSize]': 10,
    'pagination[page]': this.currentPage,
    populate: ['owner'],
    filters: this.filters()
  });

  private filters = () => {
    let filters: any[] = [
      { field: 'selled', operator: FilterOperator.$eq, value: false, option: FilterDeepOption.$and },
      {
        field: '[owner][id]',
        value: <number>this.currentUserId,
        operator: FilterOperator.$eq,
        option: FilterDeepOption.$and
      }
    ];
    if (!!this.year && !!this.month)
      filters = [...filters, {
        field: 'createdAt', operator: FilterOperator.$gte,
        value: `${ this.year }-${ this.month?.value }-01`,
        option: FilterDeepOption.$and
      },
        {
          field: 'createdAt', operator: FilterOperator.$lte,
          value: `${ this.year }-${ this.month?.value }-${ moment(`${ this.year }-${ this.month?.value }-01`).daysInMonth() }`,
          option: FilterDeepOption.$and
        }
      ];
    return filters;
  }
}
