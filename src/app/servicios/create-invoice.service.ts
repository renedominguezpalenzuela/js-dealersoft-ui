import { Injectable } from '@angular/core';

import { Invoice } from '../core/interfaces/invoice';
import { FilterDeepOption } from '@core/interfaces';
import { FilterOperator } from '@core/interfaces/query-params';
import { User } from '@core/interfaces';

import { Observable } from 'rxjs';

import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
  AuthService,
} from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class CreateInvoiceService {
  constructor(
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService,
    private readonly apiHelperService: ApiHelperService,
    private readonly authService: AuthService
  ) {}
  // myInvoice: Invoice [] = [];

  last_invoice_number: number = 220000;
  public authUser: User | null = null;
  public isAuth: boolean = false;

  private queryInvoices = (id: any) =>
    this.requestService.generateQuery({
      filters: [
        {
          field: '[owner][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  public devolverAsyncrono(): Observable<any> {
    return new Observable((observer) => {
      // observable execution
      observer.next('bla bla bla');
      observer.complete();
    });
  }

  public generateInvoice_Number(): Observable<any> {
    this.last_invoice_number = 220000;

    return new Observable((observer) => {


      this.authService.currentUser.subscribe((user) => {
        this.isAuth = this.authService.isAuth;
        this.authUser = user;

        this.requestService
        .Get(
          this.apiHelperService.invoicesURL,
          this.queryInvoices(this.authUser?.id)
        )
        .subscribe((res) => {
          let datos = res.data;
          //Busco el mayor invoice_number guardado

          datos.map((unDato: any) => {
            let numero_en_db = Number(unDato.attributes.invoice_number);

            if (numero_en_db > this.last_invoice_number) {
              this.last_invoice_number = numero_en_db;
            }
          });

          this.last_invoice_number = this.last_invoice_number + 1;

        

          observer.next(String(this.last_invoice_number));
          observer.complete();
        });

      });

      //buscar todas las ventas del usuario
      //si no existe el invoice_number, se genera uno nuevo


    });
  }

  guardarInvoice(DatosInvoice: any) {
    this.requestService
      .Post(this.apiHelperService.invoicesURL, DatosInvoice)
      .subscribe(() => {
        this.notificationService.riseNotification({
          color: 'success',
          data: 'Neue Rechnung gespeichert',
        });
        // this.router.navigate(['/admin/list-invoices']);
      });
  }
}
