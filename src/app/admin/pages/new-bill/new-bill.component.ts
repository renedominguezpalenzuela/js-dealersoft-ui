import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
  AuthService,
} from '@core/services';

import { Observable } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Customer, FilterDeepOption, Invoice } from '@core/interfaces';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';

import { CreateInvoiceService } from '../../../servicios/create-invoice.service';

import * as saveAs from 'file-saver';
import * as moment from 'moment';

import { forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Inject } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import 'moment/locale/de';

import {CalculosService} from './../../../servicios/calculos.service';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.

    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    //{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'L',
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class NewBillComponent implements OnInit, AfterViewInit, OnChanges {
  public newInvoiceForm = this.formBuilder.group({
    invoice_number: [null, [Validators.required]],
    reference_invoice_number: [null, [Validators.required]],
    invoice_type: [1, [Validators.required]],
    cancelled: [false, [Validators.required]],

    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    date: [null, [Validators.required]],
    delivery_date: [null, [Validators.required]],
    client: [null, [Validators.required]],
    a25: [true, [Validators.required]],
    iva: [false, [Validators.required]],
    places: this.formBuilder.array([], [Validators.required, Validators.minLength(1)] ),
    owner: [null, [Validators.required]],
    car_sell_data:[null],
    car:[null]
  });

  total_decimales = 2;

  a25_activo = false;

  cancel_bill = false;

  private readonly jwt: string;

  public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = []; //lista de clientes del Usuario

  public boton_salvar_disabled: boolean = false;
  public mostrar_boton_imprimir: boolean = false;

  @Input() public invoice_data: any | undefined;

  private currentUserId: number | undefined;
  private invoice_id: string | undefined;

  @ViewChild('autoComplete') private autoComplete:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly router: Router,
    private readonly validationsService: ValidationsService,
    private readonly notificationService: NotificationService,
    private readonly matDialog: MatDialog,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly createInvoice: CreateInvoiceService,
    private readonly httpClient: HttpClient,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private readonly calculos: CalculosService
  ) {
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
  }

  get articles(): FormArray {
    return this.newInvoiceForm.controls['places'] as FormArray;
  }

  private queryInvoices = (id: any) =>
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

  ngOnInit(): void {
    this._locale = 'de';
    this._adapter.setLocale(this._locale);

    this.authService.currentUser.subscribe((user) => {
      this.currentUserId = user?.id;

      this.newInvoiceForm.patchValue({
        owner: user?.id,
      });

      //Pidiendo lista de clientes del usuario logueado
      this.requestService
        .Get(
          this.apiHelperService.clientsURL,
          this.queryClients(this.currentUserId)
        )
        .subscribe(
          (res) => (this.filteredOptions = this.clientsOptions = res.data)
        );
    });

    //Pidiendo datos del invoice recibido como parametro
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        //Deshabilitar boton de salvar
        this.boton_salvar_disabled = true;
        this.mostrar_boton_imprimir = true;

        this.invoice_id = params['id'];

        this.requestService
          .Get(
            `${this.apiHelperService.invoicesURL}/${params['id']}`,
            this.queryInvoices(params['id'])
          )
          .subscribe((res) => {

         
            this.invoice_data = res.data.attributes;

            this.newInvoiceForm.patchValue({
              ...this.invoice_data,
              client: res.data.attributes.client.data.id,
            });

            //Adicionando nuevos articulo
            this.invoice_data.places.map((unDato: any) => {
          

              this.addArticlesWidtData(unDato);
            });

            this.newInvoiceForm.updateValueAndValidity();
            this.desHabilitarControles();
          });
      } else {
        //Habilitar boton de salvar
        this.boton_salvar_disabled = false;
        this.mostrar_boton_imprimir = false;

        //Adicionando nuevo articulo vacio
        this.addArticle();
      }
    });

    //OLD CODE:

    //seteando eventos para botones iva y a25
    this.newInvoiceForm
      .get('iva')!
      .valueChanges.subscribe((change: boolean) => {
        if (change) {
          this.a25_activo = false;
        } else {
          this.a25_activo = true;
        }

        this.newInvoiceForm.patchValue(
          { a25: !change },
          { emitEvent: false, onlySelf: true }
        );
      });

    this.newInvoiceForm
      .get('a25')!
      .valueChanges.subscribe((change: boolean) => {
        if (change) {
          this.a25_activo = true;
        } else {
          this.a25_activo = false;
        }

        this.newInvoiceForm.patchValue(
          { iva: !change },
          { emitEvent: false, onlySelf: true }
        );
      });
  }

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.newInvoiceForm, input);
  };





  public submit() {
    if (this.newInvoiceForm.valid) {

      let datosInvoice = {
        ...this.newInvoiceForm.value,
      }

      let articulos:any=[];

      datosInvoice.places.map((unArticulo:any)=>{

        unArticulo.unit_price = this.calculos.parseGermanNumber( unArticulo.unit_price);
        articulos.push(unArticulo);
      });
      

      datosInvoice.places = articulos;
     




      this.requestService
        .Post(this.apiHelperService.invoicesURL, datosInvoice)
        .subscribe((datos) => {
          this.notificationService.riseNotification({
            color: 'success',
            data: 'Neue Rechnung generiert',
          });
          this.router.navigate(['/admin/list-invoices']);
        });
    } else {
      let errores = this.findInvalidControls();

      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Fehlende Angaben',
      });
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.newInvoiceForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name + ', ' + controls[name].value);
      }
    }
    return invalid;
  }

  private queryClients = (id: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[user][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  public addCustomer = ($event: MouseEvent) => {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    this.matDialog
      .open(CustomerFormComponent, {
        width: '650px',
        height: '530px',
      })
      .afterClosed()
      .subscribe((out: boolean | { body: any }) => {
        if (typeof out !== 'boolean' && typeof out !== 'undefined') {
          const subscription = (res: any) => {
            this.notificationService.riseNotification({
              color: 'success',
              data: 'Neukunde Bericht generiert',
            });
            this.clientsOptions.push(res.data);
            this.autoComplete!.nativeElement.value = `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;
          /*  this.autoComplete!.nativeElement.value =res.data.attributes.company_name ? `${res.data.attributes.company_name}` : `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;*/
            this.newInvoiceForm.patchValue({ client: res.data.id });
          };
          this.requestService
            .Post(this.apiHelperService.clientsURL, out.body)
            .subscribe(subscription);
        }
      });
  };

  public displayFn = (id: string): string => {
    if (this.filteredOptions.length > 0) {
      const customer: Customer = <Customer>(
        this.filteredOptions.find((elm) => elm.id === id)
      );
      if (customer)
        return `${customer.attributes.first_name} ${customer.attributes.last_name}`;
        //return  customer.attributes.company_name ? customer.attributes.company_name : `${customer.attributes.first_name} ${customer.attributes.last_name}`;
      else return '';
    }
    return '';
  };

  //mostrando lista de clientes en combobox
  ngAfterViewInit(): void {
    // this.ActualizarDatos(this.invoice_id);
    fromEvent(this.autoComplete!.nativeElement, 'input')
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(($event: any) => {
        const result = this._filter($event.target.value);
        if (result.length > 0) this.filteredOptions = result;
        else {
          const query = this.requestService.generateQuery({
            filters: [
              {
                field: 'first_name',
                operator: FilterOperator.$contains,
                value: $event.target.value,
                option: FilterDeepOption.$or,
              },
              {
                field: 'last_name',
                operator: FilterOperator.$contains,
                value: $event.target.value,
                option: FilterDeepOption.$or,
              },
              {
                field: 'email',
                operator: FilterOperator.$contains,
                value: $event.target.value,
                option: FilterDeepOption.$or,
              },
              {
                field: 'company_name',
                operator: FilterOperator.$contains,
                value: $event.target.value,
                option: FilterDeepOption.$or,
              },
            ],
          });
          this.requestService
            .Get(this.apiHelperService.clientsURL, query)
            .subscribe((res) => {
              if (res.data.length > 0) this.filteredOptions = res.data;
              else this.filteredOptions = this.clientsOptions;
            });
        }
      });
  }

  //Adicionando nuevo articulo
  public addArticle = () => {
    const articleForm = this.formBuilder.group({
      article: [null, Validators.required],
      quantity: [null, Validators.required],
      unit_price: [null, Validators.required],
    });

    this.articles.push(articleForm);
  };

  public addArticlesWidtData = (datos: any) => {
    const articleForm = this.formBuilder.group({
      article: [null, Validators.required],
      quantity: [null, Validators.required],
      unit_price: [null, Validators.required],
    });

    this.articles.push(articleForm);



    if (datos) {
      articleForm.patchValue({ ...datos, unit_price: this.calculos.createGermmanNumber(datos.unit_price) });
    }
  };

  public deleteArticle = (index: number) => {
    this.articles.removeAt(index);
  };

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.clientsOptions.filter(
      (option) =>
        option.attributes.first_name.toLowerCase().includes(filterValue) ||
        option.attributes.last_name.toLowerCase().includes(filterValue) ||
        option.attributes.email.toLowerCase().includes(filterValue)  ||
        option.attributes.company_name.toLowerCase().includes(filterValue) 
    );
  }

  private ActualizarDatos(invoice_id: any) {
    this.requestService
      .Get(
        this.apiHelperService.invoicesURL,
        this.requestService.generateQuery({
          populate: ['car', 'client'],
          filters: [
            {
              field: '[client][id]',
              operator: FilterOperator.$eq,
              value: <string>invoice_id,
              option: FilterDeepOption.$and,
            },
          ],
        })
      )
      .subscribe((res) => {
        const data = res?.data[0]?.attributes;

        this.newInvoiceForm.patchValue({
          ...data,
          client: data?.client?.data?.id,
        });
        // this.newInvoiceForm.patchValue({
        //   gross_buy: data?.gross_buy?.toFixed(this.total_decimales),
        //   net_buy: data?.net_buy?.toFixed(this.total_decimales),
        //   iva_buy: data?.iva_buy?.toFixed(this.total_decimales),
        // });
        this.newInvoiceForm.updateValueAndValidity();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    

    if (this.boton_salvar_disabled === true) {
      this.desHabilitarControles();
    }

    if (changes?.['invoice_data'] && this.invoice_data) {
      this.requestService
        .Get(
          this.apiHelperService.invoicesURL,
          this.requestService.generateQuery({
            populate: ['*'],
            filters: [
              {
                field: '[id]',
                operator: FilterOperator.$eq,
                value: <string>this.invoice_data?.id,
                option: FilterDeepOption.$and,
              },
            ],
          })
        )
        .subscribe((res) => {
          const data = res?.data[0]?.attributes;

        

      

          if (data.invoice_type === 2) {
            this.cancel_bill = true;
          } else {
            this.cancel_bill = false;
          }

          

          this.newInvoiceForm.patchValue({
            ...data,
          });

         
          // this.newInvoiceForm.patchValue({
          //   gross_buy: data?.gross_buy?.toFixed(this.total_decimales),
          //   net_buy: data?.net_buy?.toFixed(this.total_decimales),
          //   iva_buy: data?.iva_buy?.toFixed(this.total_decimales),
          // });
          this.newInvoiceForm.updateValueAndValidity();
        });
    }
  }


  //----------------------------------------------------------------------------
  // Generate invoice 
  //----------------------------------------------------------------------------
  public generateInvoice_Number() {
    let valorFormularioInvoice_Number =  this.newInvoiceForm.get('invoice_number')!.value;

    if (valorFormularioInvoice_Number != null) {
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Rechnungsnummer wurde bereits generiert, es kann keine neue erstellt werden',
      });

      return;
    }

    let numero = this.createInvoice.generateInvoice_Number().subscribe((datos: any) => {
       
        
         this.newInvoiceForm.patchValue({
           invoice_number: datos,
           reference_invoice_number: datos,
         });

        

      });
  }

  public generateCancelInvoice_Number(): Observable<any> {

    return this.createInvoice.generateCancelInvoice_Number();
   
  }

  public keydown(event: any) {
    let cadena_texto = event.target.value;
    const lineas = (cadena_texto.match(/\n/g) || []).length + 1;

    if (lineas >= 2 && event.keyCode == 13) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public generatePdf = () => {
    // this.Prueba();

    let tipo = '/';

    



    if (this.invoice_data?.invoice_type === 2) {
      //invoice de cancelacion
      if (this.a25_activo) {  
        tipo = 'reports/bill-cancel/a25';
      } else {        
        tipo = 'reports/bill-cancel/iva';
      }
    } else {
      //invoice normal
      if (this.a25_activo) {  
        tipo = 'reports/bill/a25';
      } else {
        
        tipo = 'reports/bill/iva';
      }
    }

  
   
  

    this.requestService
      .downloadPDF(this.apiHelperService.pdfURL, {
        // type: ExportType.vehicle,
        type: tipo,
        id: this.invoice_id, //no es un car
      })
      .subscribe((res) => {

        let nombre =   `Storno Rechnung St.-Nr. ${this.invoice_data?.cancel_number} für Re Nr. ${this.invoice_data?.reference_invoice_number} .pdf`;
        if (this.invoice_data?.invoice_type===1) {
           nombre=  `Rechnung_${this.invoice_data?.invoice_number}_(${moment().format('YYYY-MM-DD')}).pdf`
        }


        saveAs(  new Blob([res], { type: 'application/pdf' }),    nombre );


        
      });
  };

  bill_info: any = '';

  public Prueba = () => {
    forkJoin([
      this.httpClient.get<any>(`${  this.apiHelperService.invoicesURL }/${ this.invoice_id }`, this.generateOptionsInvoice( this.invoice_id)),
      // this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),
    ]).subscribe((res) => {

      
      this.bill_info = res[0].data.attributes
     

      let invoice_number = this.bill_info.invoice_number;
    

      //let client = this.bill_info.owner.data.attributes;
      let client = this.bill_info;

      //console.log("Client")
      //console.log(this.bill_info.client.data.attributes);
     
      //let owner = this.bill_info.attributes.owner.data.attributes;

      // this.car_buy_data = res[1].data.filter((item: any) => item.attributes.car.data.id === this.id)[0];
      //   this.logo = res[2].data.filter((item: any) => item.attributes.user.data.id === res[3].id)[0];
      //   if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
      //   this.me = res[3];
    });
  };


  
  private generateOptionsInvoice = (id: any) => {
    return {
      params: this.queryInvoice(id),
    };
  };

  private queryInvoice = (id: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[id]',
          operator: FilterOperator.$eq,
          value: id,
          option: FilterDeepOption.$and,
        },
      ],
    });

  private generateOptions = () => {
    return {
      params: this.query(),
      //  headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    };
  };

  private query = () =>
    this.requestService.generateQuery({
      populate: ['owner', 'client', 'car', 'user', 'logo'],
    });

  desHabilitarControles() {
    for (const field in this.newInvoiceForm.controls) {
      // 'field' is a string
      this.newInvoiceForm.controls[field].disable();
    }
  }

  habilitarControles() {
    for (const field in this.newInvoiceForm.controls) {
      // 'field' is a string
      this.newInvoiceForm.controls[field].enable();
    }
  }

  cancelInvoice() {
    //si el tipo de invoice a cancelar es 2, no se puede cancelar
    //Eine Stornorechnung kann nicht storniert werden
    //si el invoice a cancelar esta ya cancelada no se puede cancelar
    //Eine stornierte Rechnung kann nicht storniert werden

    if (this.invoice_data.cancelled) {  
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Eine stornierte Rechnung kann nicht storniert werden',
      });
      return;
    }

    if (this.invoice_data.invoice_type===2) {    
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Eine Stornorechnung kann nicht storniert werden',
      });
      return; 
    }

    this.generateCancelInvoice_Number().subscribe((numero_cancelacion) => {

      let datosInvoice = {
          ...this.invoice_data,
          invoice_number: null,
          cancel_number: numero_cancelacion,
          reference_invoice_number: this.newInvoiceForm.get('invoice_number')?.value,
          cancelled: false,
          invoice_type: 2,
          client: this.invoice_data?.client.data.id,
          owner: this.invoice_data?.owner.data.id,
          title: "Rechnungsnummer " +this.newInvoiceForm.get('invoice_number')?.value+ " stornieren",
          car: null,
          car_sell_data:null
          
        
        };

    
        

     

       

      
        this.createInvoice
          .guardarInvoiceDatosEnBD(datosInvoice)
          .subscribe((datos) => {

           
            //Creada nueva invoice
            this.requestService
            .Put(this.apiHelperService.invoicesURL + '/' +this.invoice_id  , {
              cancelled: true,            
            }).subscribe(()=>{

               if (this.invoice_data.car_sell_data.data && this.invoice_data.car.data) {
                let car_id = this.invoice_data.car.data.id;
                let car_selled_id = this.invoice_data.car_sell_data.data.id;

              
                // Eliminar
                //car_id:any, car_selled_id:any
                this.createInvoice.carCancelInvoice(car_id, car_selled_id).subscribe(()=>{
                  this.notificationService.riseNotification({
                    color: 'success',
                    data: 'Stornorechnung erstellt',
                  });
                  this.router.navigate(['/admin/list-invoices']);

                })
               } else {
                this.notificationService.riseNotification({
                  color: 'success',
                  data: 'Stornorechnung erstellt',
                });
                this.router.navigate(['/admin/list-invoices']);
               }

             
            })
      })
  
  
     
    });
  }


  public actualizarValor(event:any) {

    this.articles.controls.map((unFormulario:any)=>{

      const datos = unFormulario.value; 
      
      unFormulario.patchValue({ ...datos, unit_price: this.calculos.createGermmanNumber(datos.unit_price) });
      

    })

   
  }
}
