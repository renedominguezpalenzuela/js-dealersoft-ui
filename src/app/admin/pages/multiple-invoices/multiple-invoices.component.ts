import { Component, OnInit } from '@angular/core';
import { Invoice } from '@core/interfaces';
import {
  Column,
  ColumnType,
  OperationEvent,
  OptionSettings,
} from '@core/lib/dynamic-table/utils/interfaces';
import {
  ApiHelperService,
  LoadingService,
  RequestService,
  NotificationService,
  AuthService,
} from '@core/services';
import { delay } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceInfoComponent } from '@core/components/invoice-info/invoice-info.component';

import { FilterDeepOption } from '@core/interfaces';
import { FilterOperator } from '@core/interfaces/query-params';

import { CreateInvoiceService } from '../../../servicios/create-invoice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-multiple-invoices',
  templateUrl: './multiple-invoices.component.html',
  styleUrls: ['./multiple-invoices.component.scss'],
})
export class MultipleInvoicesComponent implements OnInit {
  private currentUserId: number | undefined;

  public data: Invoice[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.invoice_number',
      header: 'NUMMER',
      show: true,
      type: ColumnType.Regular,
      ordenar: true,
    },

    {
      column: 'attributes.reference_invoice_number',
      header: 'REF NUMMER',
      show: true,
      type: ColumnType.Regular,
      ordenar: true,
    },

    {
      column: 'attributes.cancel_number',
      header: 'STORNO NR',
      show: true,
      type: ColumnType.Regular,
      ordenar: true,
    },

    {
      column: 'attributes.title',
      header: 'Titel',
      show: true,
      type: ColumnType.Regular,
      ordenar: false,
    },
    {
      column: 'attributes.date',
      header: 'Datum',
      show: true,
      type: ColumnType.Date,
      ordenar: false,
    },
    {
      column: 'attributes.delivery_date',
      header: 'Lieferdatum',
      show: true,
      type: ColumnType.Date,
      ordenar: false,
    },
    {
      column: 'attributes.a25',
      header: '§25a',
      show: true,
      type: ColumnType.Boolean,
      ordenar: false,
    },
    {
      column: 'attributes.iva',
      header: 'inkl. MwSt.',
      show: true,
      type: ColumnType.Boolean,
      ordenar: false,
    },
  ];

  public OptionSettings: OptionSettings = {
    options: [
      {
        icon: 'edit',
        literal: 'Detail anzeigen',
        event: 'Detail',
      },
      {
        icon: 'picture_as_pdf',
        literal: 'PDF exportieren',
        event: 'ExportPdf',
      },
      {
        icon: 'delete',
        literal: 'Storno Rechnung erstellen',
        event: 'Cancel',
      },
    ],
  };

  public filterQuery: string = '';
  public loading: boolean = false;
  public noShowLoader = true;
  public pageCount: number = 100;
  public currentPage: number = 1;
  public extraOption: { event: string; icon: string } = {
    event: 'Detail',
    icon: 'chevron_right',
  };

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly authService: AuthService,
    private readonly createInvoice: CreateInvoiceService,
    private readonly notificationService: NotificationService,
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number>(
        (<unknown>this.activatedRoute.snapshot.queryParamMap.get('page'))
      );
    }
    this.noShowLoader = false;
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUserId = user?.id;
      this.loadPaginatedData(this.currentPage);
    });
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => (this.loading = loading));

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page'))
        this.currentPage = <number>(<unknown>map.get('page'));
    });
  }

  public loadPaginatedData = ($event: number) => {
    this.currentPage = $event;
    this.requestService
      .Get(this.apiHelperService.invoicesURL, this.query(this.currentUserId))
      .subscribe((res) => {
        this.data = res.data;
        this.pageCount = res.meta.pagination.pageCount;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: this.currentPage },
          queryParamsHandling: 'merge',
        });
        this.noShowLoader = true;
      });
  };

  public catchEvent($event: OperationEvent) {
    switch ($event.type) {
      case 'ExportPdf':
        this.generatePdf($event.value.id, $event.value.attributes);
        // this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
        //   type: ExportType.invoice,
        //   invoiceId: $event.value.id
        // }).subscribe(res => {
        //   const year = moment(($event.value as Invoice).attributes.createdAt).year();
        //   const month = moment(($event.value as Invoice).attributes.createdAt).format('MMMM');
        //   saveAs(new Blob([res], { type: 'application/pdf' }),
        //     `Rechnung [${ month }, ${ year }] (${ moment().format('YYYY-MM-DD') }).pdf`);
        // });
        break;
      case 'Detail':
        // this.requestService.Get(
        //   `${ this.apiHelperService.invoicesURL }/${ $event.value.id }`,
        //   this.queryInvoice()
        // ).subscribe(res => {
        //   this.matDialog.open(InvoiceInfoComponent, {
        //     width: '580px',
        //     height: '480px',
        //     data: <Invoice>res.data,
        //     backdropClass: 'modal-backdrop'
        //   });
        // });
        // this.router.navigate(['/admin/new-invoice', $event.value.id] );
        // this.router.navigate(['/admin/new-invoice/${event.value.id}'] );

        this.router.navigate(['/admin/new-invoice/', $event.value.id]);
        break;

      case 'Cancel':
        this.cancelInvoice($event.value.id, $event.value.attributes);
        break;
      default:
        break;
    }
  }

  public generatePdf = (id: any, invoice_data: any) => {
    // this.Prueba();

    let tipo = '/';


   
    if (invoice_data?.invoice_type === 2) {
      
    if (invoice_data.a25) {
      tipo = 'reports/bill-cancel/a25';
    } else {
      tipo = 'reports/bill-cancel/iva';
    }
    
    } else {




    if (invoice_data.a25) {
      tipo = 'reports/bill/a25';
    } else {
      tipo = 'reports/bill/iva';
    }
  }

    this.requestService
      .downloadPDF(this.apiHelperService.pdfURL, {
        // type: ExportType.vehicle,
        type: tipo,
        id: id, //no es un car
      })
      .subscribe((res) => {
        let nombre = `Storno Rechnung St.-Nr. ${invoice_data?.cancel_number} für Re Nr. ${invoice_data?.reference_invoice_number} .pdf`;
        if (invoice_data?.invoice_type === 1) {
          nombre = `Rechnung_${invoice_data?.invoice_number}_(${moment().format(
            'YYYY-MM-DD'
          )}).pdf`;
        }

        saveAs(new Blob([res], { type: 'application/pdf' }), nombre);
      });
  };

  /**
   * 
   * 
   *   private queryInvoices = (id: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[client][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });
   */

  private query = (id: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[owner][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
      'pagination[pageSize]': 10,
      'pagination[page]': this.currentPage,
    });

  private queryInvoice = () =>
    this.requestService.generateQuery({
      populate: ['client'],
    });



    
  public generateCancelInvoice_Number(): Observable<any> {
    // return this.createInvoice.generateInvoice_Number();
    return this.createInvoice.generateCancelInvoice_Number();
  }

  cancelInvoice(id: any, invoice_data: any) {
    //si el tipo de invoice a cancelar es 2, no se puede cancelar
    //Eine Stornorechnung kann nicht storniert werden
    //si el invoice a cancelar esta ya cancelada no se puede cancelar
    //Eine stornierte Rechnung kann nicht storniert werden

    if (invoice_data.cancelled) {
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Eine stornierte Rechnung kann nicht storniert werden',
      });
      return;
    }

    if (invoice_data.invoice_type === 2) {
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Eine Stornorechnung kann nicht storniert werden',
      });
      return;
    }

 
      this.createInvoice
        .generateCancelInvoice_Number()
        .subscribe((numero_cancelacion: any) => {

          let datosInvoice = {
            ...invoice_data,
            invoice_number: null,
            cancel_number: numero_cancelacion,
            reference_invoice_number: invoice_data.invoice_number,
            cancelled: false,
            invoice_type: 2,
            client: invoice_data?.client.data.id,
            owner: invoice_data?.owner.data.id,
            title:  'Rechnungsnummer ' + invoice_data.invoice_number + ' stornieren',
            car: null,
            car_sell_data:null
            
          };

          this.createInvoice
            .guardarInvoiceDatosEnBD(datosInvoice)
            .subscribe(() => {
              //Creada nueva invoice
              this.requestService
                .Put(this.apiHelperService.invoicesURL + '/' + id, {
                  cancelled: true,
                })
                .subscribe(() => {

                  if (invoice_data.car_sell_data.data && invoice_data.car.data) {
                    let car_id = invoice_data.car.data.id;
                    let car_selled_id = invoice_data.car_sell_data.data.id;
    
                  
    
                    // Eliminar
                    //car_id:any, car_selled_id:any
                    this.createInvoice.carCancelInvoice(car_id, car_selled_id).subscribe(()=>{
                      this.notificationService.riseNotification({
                        color: 'success',
                        data: 'Stornorechnung erstellt',
                      });
                      //this.router.navigate(['/admin/list-invoices']);
                      window.location.reload()
    
                    })
                   } else {
                    this.notificationService.riseNotification({
                      color: 'success',
                      data: 'Stornorechnung erstellt',
                    });
                    //this.router.navigate(['/admin/list-invoices']);
                    window.location.reload()
                   }

                 
                 
//                  this.router.navigate(['/admin/list-invoices']);
                });
            });
        });
    
  }
}
