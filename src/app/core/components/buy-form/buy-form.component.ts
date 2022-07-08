import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
} from '@core/services';
import { Car, Customer, FilterDeepOption } from '@core/interfaces';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as moment from 'moment';

import { Inject} from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/de';


import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],


})
export class BuyFormComponent implements OnInit, OnChanges, AfterViewInit {
  focus_net_buy = false;
  focus_gross_buy = false;
  focus_iva = false;

  total_decimales = 2;

  vGross_buy: number = 0.0;
  a25_activo = true;

  private readonly jwt: string;

  //variable recibida desde el componente padre que contiene los datos provenientes del API
  @Input() public car_data: Car | undefined;
  actualizando_radio_buttons = false;

  
  @Input() public boton_salvar_disabled!: Boolean | undefined;

  /*
  campo del formulario car_name
  en html:
     <input formControlName="car_name" matInput readonly="true" >

  car_name: [null, [Validators.required]],
     null --- valor inicial?
     [Validators.required] --- campo obligatorio

  a25: [true, [Validators.required]],
  true -- -valor inicial = true

  [Validators.min(0)]  --- valor minimo que acepta el campo

*/
  public carBuyForm = this.formBuilder.group({
    car_name: [null, [Validators.required]],
    car: [null, [Validators.required]],
    client: [null, [Validators.required]],
    collection: [null, [Validators.required]],
    payment: [null, [Validators.required, Validators.min(0)]],

    iva_buy: [{ value: null, disabled: true }, [Validators.min(0)]],
    net_buy: [{ value: null, disabled: false }, [Validators.min(0)]],
    gross_buy: [{ value: null, disabled: true }, [Validators.min(0)]],
    // net_buy_adjustment: [null, [Validators.required, Validators.min(0)]],
    //  net_buy_adjustment: [null, [ Validators.min(0)]],
    //year_interest_rate: [null, [Validators.required, Validators.min(0)]],
    // total: [null, [Validators.required, Validators.min(0)]],
    buy_date: [null, [Validators.required]],
    a25: [true, [Validators.required]], //Check Box
    iva: [false, [Validators.required]], //Check Box
    bemerkunhen: [null],
  });
  // public factorNrutto: number = 0.8403;
  // public factorIva: number = 0.1597;

  //public factorNrutto: number = 0.81;
  public factorIva: number = 0.19;
  @Input() public carsOptions: Car[] = [];
  @Input() public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = [];
  public isIvaActive: boolean = false;
  @ViewChild('autoComplete') private autoComplete:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService,
    private readonly apiHelperService: ApiHelperService,
    private readonly matDialog: MatDialog,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient

  ) {

    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');


    
  }

  // public calcularIVA() {

  //   const vNet_buy: number = this.carBuyForm.get('net_buy')!.value;

  //   let vIva: number = Number(vNet_buy * this.factorIva);
  //   let vGross_buy: number =0;
  //   vGross_buy =  Number(vNet_buy) + vIva;

  //   if (!this.isIvaActive) {
  //     vIva = 0;
  //     vGross_buy = 0;
  //   }

  //   this.carBuyForm.patchValue({
  //     iva_buy: vIva.toFixed(this.total_decimales),
  //     gross_buy: vGross_buy.toFixed(this.total_decimales),
  //   });

  //   this.carBuyForm.updateValueAndValidity();
  // }

  desHabilitarControles() {
    for (const field in this.carBuyForm.controls) { // 'field' is a string
      this.carBuyForm.controls[field].disable();
    }
	}

  
  habilitarControles() {
    for (const field in this.carBuyForm.controls) { // 'field' is a string
      this.carBuyForm.controls[field].enable();
    }
  }


  public calcularIVA() {
    let vNet_buy: number = this.carBuyForm.get('net_buy')!.value;
    let vGross_buy: number = this.carBuyForm.get('gross_buy')!.value;
    let vIva: number = this.carBuyForm.get('iva')!.value;

    if (vNet_buy != null && vNet_buy != 0) {
      vIva = Number(vNet_buy * this.factorIva);
      vGross_buy = Number(vNet_buy) + vIva;
      this.carBuyForm.patchValue({
        iva_buy: vIva.toFixed(this.total_decimales),
        gross_buy: vGross_buy.toFixed(this.total_decimales),
      });
    } else {
      if (vGross_buy != null && vGross_buy != 0) {
        vNet_buy = vGross_buy / (1 + this.factorIva);
        vIva = vGross_buy - vNet_buy;
        this.carBuyForm.patchValue({
          iva_buy: vIva.toFixed(this.total_decimales),
          net_buy: vNet_buy.toFixed(this.total_decimales),
        });
      }
    }
    this.carBuyForm.updateValueAndValidity();
  }

  public activarIVA() {
    this.carBuyForm.get('iva_buy')!.enable();
    this.carBuyForm.get('iva_buy')!.addValidators(Validators.required);

    this.carBuyForm.get('gross_buy')!.enable();
    this.carBuyForm.get('gross_buy')!.addValidators(Validators.required);

    this.carBuyForm.get('net_buy')!.enable();
    this.carBuyForm.get('net_buy')!.addValidators(Validators.required);

    // this.carBuyForm.updateValueAndValidity();
    this.isIvaActive = true;
    this.calcularIVA();

    // if (this.carBuyForm.get('net_buy')!.value) this.updateCosts();
  }

  public desactivarIVA() {
    this.carBuyForm.get('iva_buy')!.setValue(null);
    this.carBuyForm.get('iva_buy')!.markAsUntouched();
    this.carBuyForm.get('iva_buy')!.markAsPristine();
    this.carBuyForm.get('iva_buy')!.removeValidators(Validators.required);
    this.carBuyForm.get('iva_buy')!.disable();

    // this.carBuyForm.get('gross_buy')!.markAsUntouched();
    // this.carBuyForm.get('gross_buy')!.markAsPristine();
    this.carBuyForm.get('gross_buy')!.enable();
    this.carBuyForm.get('gross_buy')!.addValidators(Validators.required);

    this.carBuyForm.get('net_buy')!.setValue(null);
    this.carBuyForm.get('net_buy')!.markAsUntouched();
    this.carBuyForm.get('net_buy')!.markAsPristine();
    this.carBuyForm.get('net_buy')!.removeValidators(Validators.required);
    this.carBuyForm.get('net_buy')!.disable();

    this.carBuyForm.patchValue({ net_buy: null, iva_buy: null });

    // this.carBuyForm.patchValue({ net_buy: null, iva_buy: null });
    // this.carBuyForm.updateValueAndValidity();
    this.isIvaActive = false;
  }

  ngOnInit(): void {
    this._locale = 'de';
    this._adapter.setLocale(this._locale);

   
 

    //Cambios en el valor del checkbox a25
    this.carBuyForm.get('iva')!.valueChanges.subscribe((change: boolean) => {
      if (this.boton_salvar_disabled) return;

      if (this.actualizando_radio_buttons) return;
      this.actualizando_radio_buttons = true;
      if (change) {
        this.activarIVA();
        this.carBuyForm.patchValue({ a25: false });
        this.a25_activo = false;
      } else {
        this.desactivarIVA();
        this.carBuyForm.patchValue({ a25: true, net_buy: null, iva_buy: null });
        this.a25_activo = true;
      }
      this.actualizando_radio_buttons = false;
    });

    this.carBuyForm.get('a25')!.valueChanges.subscribe((change: boolean) => {
      if (this.boton_salvar_disabled) return;

      if (this.actualizando_radio_buttons) return;
      this.actualizando_radio_buttons = true;
      if (change) {
        this.a25_activo = true;
        this.desactivarIVA();
        this.carBuyForm.patchValue({ iva: false, net_buy: null, iva_buy: null });
      } else {
        this.activarIVA();
        this.carBuyForm.patchValue({ iva: true });
        this.a25_activo = false;
      }
      this.actualizando_radio_buttons = false;
    });

    this.carBuyForm.get('net_buy')!.valueChanges.subscribe(() => {
      if (this.boton_salvar_disabled) return;
      
     

      if (this.focus_net_buy) {
        const value: number = this.carBuyForm.get('net_buy')!.value;

        let vIva = value * this.factorIva;
        let vGross_buy = value + vIva;

        if (!this.isIvaActive) {
          vIva = 0;
          vGross_buy = 0;
        }

        this.carBuyForm.patchValue({
          iva_buy: vIva.toFixed(this.total_decimales),
          gross_buy: vGross_buy.toFixed(this.total_decimales),
        });

        this.carBuyForm.updateValueAndValidity();
      }
    });

    this.carBuyForm.get('gross_buy')!.valueChanges.subscribe(() => {
      if (this.boton_salvar_disabled) return;
      

      if (this.focus_gross_buy) {
        const value: number = this.carBuyForm.get('gross_buy')!.value;
        const iva: number = (value * this.factorIva) / (1 + this.factorIva);

        let vNet_buy = value - iva;
        let vIva = iva;

        if (!this.isIvaActive) {
          vNet_buy = 0;
          vIva = 0;
        }

        this.carBuyForm.patchValue({
          iva_buy: vIva.toFixed(this.total_decimales),
          net_buy: vNet_buy.toFixed(this.total_decimales),
        });
        this.carBuyForm.updateValueAndValidity();
      }
    });

    this.carBuyForm.get('iva_buy')!.valueChanges.subscribe(() => {
      if (this.boton_salvar_disabled) return;
      

      if (this.focus_iva) {
        const value: number = this.carBuyForm.get('iva_buy')?.value;
        let netto: number = value / this.factorIva;

        let vGross_buy = netto + value;
        let vNetto = netto;

        if (!this.isIvaActive) {
          netto = this.carBuyForm.get('net_buy')?.value;
          vGross_buy = 0;
        }

        this.carBuyForm.patchValue({
          gross_buy: vGross_buy.toFixed(this.total_decimales),
          net_buy: vNetto.toFixed(this.total_decimales),
        });

        this.carBuyForm.updateValueAndValidity();
      }
    });

    //inicialmente si no hay datos

    this.actualizando_radio_buttons = true;
    this.a25_activo = true;

    this.desactivarIVA();
    this.actualizando_radio_buttons = false;
  }

  ngOnChanges(changes: SimpleChanges): void {


    
   
    // this.boton_salvar_disabled=true;
   if (this.car_data?.attributes.can_save) {
//    this.boton_salvar_disabled=false;
    this.habilitarControles();
   } else { 
  //  this.boton_salvar_disabled=true; 
    this.desHabilitarControles()
   }

   if ( this.boton_salvar_disabled===true ) {
    this.desHabilitarControles()
   }



 




    if (changes?.['car_data'] && this.car_data) {
      //Actualizar el nombre del carro en el formulario  a partir del valor recibido desde el parent
      this.carBuyForm.patchValue({ car_name: this.car_data.attributes.name });
      this.requestService
        .Get(
          this.apiHelperService.carsBuyURL,
          this.requestService.generateQuery({
            populate: ['car', 'client'],
            filters: [
              {
                field: '[car][id]',
                operator: FilterOperator.$eq,
                value: <string>this.car_data?.id,
                option: FilterDeepOption.$and,
              },
            ],
          })
        )
        .subscribe((res) => {
          const data = res?.data[0]?.attributes;

          this.carBuyForm.patchValue({
            ...data,
            car: this.car_data?.id,
            client: data?.client?.data?.id,
          });

          this.carBuyForm.patchValue({
            gross_buy: data?.gross_buy?.toFixed(this.total_decimales),
            net_buy: data?.net_buy?.toFixed(this.total_decimales),
            iva_buy: data?.iva_buy?.toFixed(this.total_decimales),
          });

          this.carBuyForm.updateValueAndValidity();

          this.a25_activo = this.carBuyForm.get('a25')?.value;

          // this.carBuyForm.patchValue({
          //   iva_buy: data.iva_buy.toFixed(this.total_decimales),
          //   gross_buy: vGross_buy.toFixed(this.total_decimales),
          //   net_buy: vNetto.toFixed(this.total_decimales),
          // });

        });
    }

    if (changes?.['clientsOptions'] && this.clientsOptions) {
      this.filteredOptions = this.clientsOptions;
    }
  }

  ngAfterViewInit(): void {
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

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.carBuyForm, input);
  };

  //*************************************************************************************************
  //  Boton Guardar
  //*************************************************************************************************
  public submit() {
    //Solo salvar, no imprimir
    this.salvarEImprimir(false);
  }

  

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

            
            //New customer saved
            this.notificationService.riseNotification({
              color: 'success',
              data: 'Neukunde gespeichert',
            });
            this.clientsOptions.push(res.data);
            this.autoComplete!.nativeElement.value = `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;
            this.carBuyForm.patchValue({ client: res.data.id });
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
      else return '';
    }
    return '';
  };

  private salvarEImprimir(imprimir: any) {
    //Tengo el id del carro en la tabla cars, no es el mismo

    const id = this.car_data?.id;

  

    //Convirtiendo a 2 valores decimales
    this.focus_net_buy = false;
    this.focus_gross_buy = false;
    this.focus_iva = false;

    this.carBuyForm.patchValue({
      gross_buy: Number(this.carBuyForm.get('gross_buy')!.value).toFixed(
        this.total_decimales
      ),
      net_buy: Number(this.carBuyForm.get('net_buy')!.value).toFixed(
        this.total_decimales
      ),
      iva_buy: Number(this.carBuyForm.get('iva_buy')!.value).toFixed(
        this.total_decimales
      ),
    });

    this.carBuyForm.updateValueAndValidity();

    if (!this.carBuyForm.valid) {
      //Error en datos
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'fehlende Angaben!!!!',
      });

      return;
    }


    //-------0) Actualizar IVA y A25 en CAR con valores del formulario   
    this.actualizarCarIVA_A25(this.car_data?.id, this.a25_activo, !this.a25_activo)

    //------ 1)  Busco si ya existe el carro  en cars-sell-data -------------------------
    let query = this.requestService.generateQuery({
      populate: ['car', 'client'], //Relaciones
      filters: [
        {
          field: '[car][id]', //casmpos a comparar car e id
          operator: FilterOperator.$eq,
          value: <string>id,
          option: FilterDeepOption.$and,
        },
      ],
    });

    this.requestService
      .Get(this.apiHelperService.carsBuyURL + '?' + query)
      .subscribe((res) => {
        const data = res?.data[0]?.attributes;

        //2 --- si no existe creo uno nuevo si existe lo modifico
        if (data === undefined) {
          this.requestService
            .Post(this.apiHelperService.carsBuyURL, this.carBuyForm.value)
            .subscribe(() => {
              if (imprimir) {
                this.imprimir();
              }

              //Neuwagen eingelagert ankauft
              //Bought a new car in storage
              //Salvando por primera vez el auto
              this.notificationService.riseNotification({
                color: 'success',
                data: 'gespeichert',
              });
            });
        } else {
          const id_compra = res?.data[0]?.id;

          //Si ya existe una tupla y a25, debe setearse a null los campos no usados

          let datos = {
            ...this.carBuyForm.value,          
          }
          
          if (this.a25_activo) {
            datos = {
              ...datos,
              net_buy: null, 
              iva_buy: null
            }
         }     
      
          this.requestService
            .Put(
              this.apiHelperService.carsBuyURL + '/' + id_compra,
              datos
            )
            .subscribe(() => {
              if (imprimir) {
                this.imprimir();
              }

              //Fahrzeug eingelagert
              //vehicle stored

              this.notificationService.riseNotification({
                color: 'success',
                data: 'gespeichert',
              });
            });
        }

        // this.carSellForm.patchValue({
        //   ...data,
        //   car: this.car_data?.id,
        //   client: data?.client.data.id,
        // });
      });
  }


  
  private generateOptions = () => {
    let myjwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY1NzI5OTY5NCwiZXhwIjoxNjU5ODkxNjk0fQ.IXnXVQ3I3zfgmMMfaCY9jQzfzogvHJwfwLSEIHlbNzc"
    return {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ myjwt }` })
    }
  }

  private query = () => this.requestService.generateQuery({
    populate: ['owner', 'client', 'car', 'user', 'logo']
  });


  public car_info: any;
  public car_buy_data: any;
  public logo:any;
  
  public loadPaginatedData_TEST = (id:any) => {
    forkJoin([
      this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/?id=${ id }`, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.carsBuyURL, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.logosURL, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),
    ]).subscribe((res:any) => {
      this.car_info = res[0].data2.filter((item: any) => item.id === id)[0];
      this.car_buy_data = res[1].data.filter((item: any) => item.attributes.car.data.id === id)[0];
      this.logo = res[2].data.filter((item: any) => item.attributes.user.data.id === res[3]?.id)[0];

      console.log("EEE")
      console.log(res[3])

     
    
     // if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
     // this.me = res[3];



    });
  }



  public generatePdf() {

    
    if (!this.boton_salvar_disabled) {    
      this.salvarEImprimir(true);
    } else {
      this.imprimir();
    }

  }

  private imprimir = () => {
    let tipo = '/';
    if (this.a25_activo) {
      tipo = 'reports/buy-car/a25';
    } else {
      tipo = 'reports/buy-car/iva';
    }

    this.requestService
      .downloadPDF(this.apiHelperService.pdfURL, {
        // type: ExportType.vehicle,
        type: tipo,
        id: <string>this.car_data?.id,
      })
      .subscribe((res) => {
        saveAs(
          new Blob([res], { type: 'application/pdf' }),
          `Kaufvertrag (${moment().format('YYYY-MM-DD')}).pdf`
        );
      });
  };

  //Calculo de los valores
  private updateCosts = () => {
    //const value: number = this.carBuyForm.get('net_buy')!.value;
    //this.carBuyForm.patchValue({
    //gross_buy: value * this.factorNrutto,
    //iva_buy: value * this.factorIva
    // });
    // this.carBuyForm.updateValueAndValidity();
  };

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.clientsOptions.filter(
      (option) =>
        option.attributes.first_name.toLowerCase().includes(filterValue) ||
        option.attributes.last_name.toLowerCase().includes(filterValue) ||
        option.attributes.email.toLowerCase().includes(filterValue)
    );
  }

  onFocusEvent(event: any) {
    switch (event.target.name) {
      case 'net_buy':
        this.focus_net_buy = true;
        this.focus_gross_buy = false;
        this.focus_iva = false;

        break;

      case 'gross_buy':
        this.focus_net_buy = false;
        this.focus_gross_buy = true;
        this.focus_iva = false;

        break;

      case 'iva_buy':
        this.focus_net_buy = false;
        this.focus_gross_buy = false;
        this.focus_iva = true;

        break;

      default:
        this.focus_net_buy = false;
        this.focus_gross_buy = false;
        this.focus_iva = false;
        break;
    }
  }

  focusOutFunction(event: any) {
    var value = event.target.value!;

    var strvalue = parseFloat(value).toFixed(2);

    switch (event.target.name) {
      case 'net_buy':
        this.focus_net_buy = false;
        this.carBuyForm.patchValue({
          net_buy: strvalue,
        });
        break;

      case 'gross_buy':
        this.focus_gross_buy = false;

        this.carBuyForm.patchValue({
          gross_buy: strvalue,
        });
        break;

      case 'iva_buy':
        this.focus_iva = false;

        this.carBuyForm.patchValue({
          iva_buy: strvalue,
        });
        break;

      default:
        this.focus_net_buy = false;
        this.focus_gross_buy = false;
        this.focus_iva = false;
        break;
    }
  }

  public keydown(event: any) {
    let cadena_texto = event.target.value;
    const lineas = (cadena_texto.match(/\n/g) || []).length + 1;

    if (lineas >= 4 && event.keyCode == 13) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }



  //  this.actualizarCarIVA_A25(this.carSellForm.value.car, true, false);
  public actualizarCarIVA_A25(carID: any, a25:boolean,  iva: boolean) {

    this.requestService
      .Put(this.apiHelperService.carsURL + '/' + carID, { iva: iva, a25: a25 })
      .subscribe(() => {
    
      });
  }

}
