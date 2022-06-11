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
import { Car, Customer, FilterDeepOption } from '@core/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
  AuthService,
} from '@core/services';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as moment from 'moment';
import { User } from '@core/interfaces';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss'],
})
export class SellFormComponent implements OnInit, OnChanges, AfterViewInit {
  public authUser: User | null = null;
  public isAuth: boolean = false;

  focus_net_sell = false;
  focus_gross_sell = false;
  focus_iva = false;

  total_decimales = 2;

  last_invoice_number: number = 220000;

  isChecked = false;

  actualizando_radio_buttons = false;
  
  // @Input() public car: Car | undefined;
  @Input() public car_data: Car | undefined;

  public carSellForm = this.formBuilder.group({
    car_name: [null, [Validators.required]],
    car: [null, [Validators.required]],
    client: [null, [Validators.required]],
    invoice_number: [null, [Validators.required, Validators.min(0)]],
    invoice_date: [null, [Validators.required]],
    kv_date: [null, [Validators.required, Validators.min(0)]],
    lieferung: [null, [Validators.required]],
    zahlunsart: [null, [Validators.required]],

    net_sell: [null, [Validators.required, Validators.min(0)]],
    iva_sell: [{ value: null, disabled: true }, [Validators.min(0)]],
    gross_sell: [{ value: null, disabled: true }, [Validators.required, Validators.min(0)]],

    a25: [true, [Validators.required]],
    iva: [false, [Validators.required]],
    export: [false, [Validators.required]],

    bemerkungencheck2page: [false, [Validators.required]],
    bemerkunhen: [null],
    bemerkunhen2page: [null],
    selled: [true],
  });
  // public factorNet: number = 0.8403;
  // public factorIva: number = 0.1597;

  public factorIva: number = 0.19;

  @Input() public carsOptions: Car[] = [];
  @Input() public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = [];
  public isIvaActive: boolean = false;
  public exportType = ExportType;
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
    private readonly authService: AuthService
  ) {}


  
  public calcularIVA() {
    console.log('Calculando');

    const vNet_sell: number = this.carSellForm.get('net_sell')!.value;

    let vIva: number = Number(vNet_sell * this.factorIva);
    let vGross_sell: number =0;
    vGross_sell =  Number(vNet_sell) + vIva;

    this.carSellForm.patchValue({
      iva_sell: vIva.toFixed(this.total_decimales),
      gross_sell: vGross_sell.toFixed(this.total_decimales),
    });
    this.carSellForm.updateValueAndValidity();
   
  }

  public activarIVA() {
    this.carSellForm.get('iva_sell')!.enable();
    this.carSellForm.get('iva_sell')!.addValidators(Validators.required);
    this.carSellForm.get('gross_sell')!.enable();
    this.carSellForm.get('gross_sell')!.addValidators(Validators.required);
   
    // this.carSellForm.updateValueAndValidity();
    this.isIvaActive = true;
    this.calcularIVA();

  }

  public desactivarIVA() {
    this.carSellForm.get('iva_sell')!.setValue(null);
    this.carSellForm.get('iva_sell')!.markAsUntouched();
    this.carSellForm.get('iva_sell')!.markAsPristine();
    this.carSellForm.get('iva_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('iva_sell')!.disable();

    this.carSellForm.get('gross_sell')!.setValue(null);
    this.carSellForm.get('gross_sell')!.markAsUntouched();
    this.carSellForm.get('gross_sell')!.markAsPristine();
    this.carSellForm.get('gross_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('gross_sell')!.disable();

    this.carSellForm.patchValue({ gross_buy: null, iva_buy: null });
    // this.carSellForm.updateValueAndValidity();



    this.isIvaActive = false;
  }



  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;
    });

    
    
    this.carSellForm.get('a25')!.valueChanges.subscribe((change: boolean) => {
      if (this.actualizando_radio_buttons) return;
      if (change) {
        this.actualizando_radio_buttons=true;
        this.carSellForm.patchValue({ iva: false, export: false , a25: true});
        this.desactivarIVA();
        
      } else {
        this.actualizando_radio_buttons=true;
        this.carSellForm.patchValue({ export: false, iva: true, a25: false });
       this.activarIVA();


      }
      this.actualizando_radio_buttons=false;
    });



    this.carSellForm.get('iva')!.valueChanges.subscribe((change: boolean) => {
      if (this.actualizando_radio_buttons) return;

      if (change) {
        this.actualizando_radio_buttons=true;
        this.carSellForm.patchValue({ export: false, a25: false , iva: true});
        this.activarIVA() ;
      } else {
        this.actualizando_radio_buttons=true;
        this.carSellForm.patchValue({ export: false, a25: true, iva: false });
        this.desactivarIVA();
      }
      this.actualizando_radio_buttons=false;
    });



    this.carSellForm.get('export')!.valueChanges.subscribe((change: boolean) => {
        if (this.actualizando_radio_buttons) return;
        if (change) {
          this.actualizando_radio_buttons=true;
          this.carSellForm.patchValue({ a25: false, iva: false });
          this.activarIVA();
         
        } else {
          this.actualizando_radio_buttons=true;
           this.carSellForm.patchValue({ a25: false, iva: true });
           this.activarIVA();
        }

        this.actualizando_radio_buttons=false;
      });

    this.carSellForm.get('net_sell')!.valueChanges.subscribe(() => {
      if (this.focus_net_sell) {
        const value: number = this.carSellForm.get('net_sell')!.value;

        let vIva = value * this.factorIva;
        let vGross_sell = value + vIva;

        
        if (!this.isIvaActive) {
          vIva = 0;
          vGross_sell = 0;
        }

        this.carSellForm.patchValue({
          iva_sell: vIva.toFixed(this.total_decimales),
          gross_sell: vGross_sell.toFixed(this.total_decimales),
        });
        this.carSellForm.updateValueAndValidity();
      }
    });

    this.carSellForm.get('gross_sell')!.valueChanges.subscribe(() => {
      // if (!this.isIvaActive) {
      if (this.focus_gross_sell) {
        const value: number = this.carSellForm.get('gross_sell')!.value;
        const iva: number = (value * this.factorIva) / (1 + this.factorIva);

        let vNet_sell = value - iva;
        let vIva = iva;

        
        if (!this.isIvaActive) {
          vNet_sell = this.carSellForm.get('net_sell')!.value;
          vIva = 0;
          // gross_buy=0;
        }

        this.carSellForm.patchValue({
          iva_sell: vIva.toFixed(this.total_decimales),
          net_sell: vNet_sell.toFixed(this.total_decimales),
        });
        this.carSellForm.updateValueAndValidity();
      }
    });

    this.carSellForm.get('iva_sell')!.valueChanges.subscribe(() => {
      // if (!this.isIvaActive) {
      if (this.focus_iva) {
        const value: number = this.carSellForm.get('iva_sell')!.value;
        let netto: number = value / this.factorIva;

        let vGross_sell = netto + value;
        let vNetto = netto;

        
        if (!this.isIvaActive) {
          netto = this.carSellForm.get('net_sell')?.value;
          vGross_sell = 0;
        }


        this.carSellForm.patchValue({
          gross_sell: vGross_sell.toFixed(this.total_decimales),
          net_sell: vNetto.toFixed(this.total_decimales),
        });
        this.carSellForm.updateValueAndValidity();
      }
    });

    // this.carSellForm.get('gross_sell')!.valueChanges.subscribe(() => {
    //   if (this.isIvaActive) this.updateCosts();
    // });

    //buscar todas las ventas del usuario
    //si no existe el invoice_number, se genera uno nuevo
    let valorFormularioInvoice_Number =
      this.carSellForm.get('invoice_number')!.value;

    if (valorFormularioInvoice_Number == null) {
      this.requestService
        .Get(
          this.apiHelperService.carsSellURL,
          this.querySelledCars(this.authUser?.id)
        )
        .subscribe((res) => {
          let datos = res.data;

          datos.map((unDato: any) => {
            if (
              Number(unDato.attributes.invoice_number) >
              this.last_invoice_number
            ) {
              this.last_invoice_number = Number(
                unDato.attributes.invoice_number
              );
            }
          });

          this.last_invoice_number = this.last_invoice_number + 1;

          this.carSellForm.patchValue({
            invoice_number: String(this.last_invoice_number),
          });
        });
    }
    //Buscs
  }

  private querySelledCars = (id: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[car][owner][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['car_data'] && this.car_data) {
      //Actualizar el nombre del carro en el formulario  a partir del valor recibido desde el paren
      this.carSellForm.patchValue({ car_name: this.car_data.attributes.name });

      //Actualizo los datos del carro
      this.requestService
        .Get(
          this.apiHelperService.carsSellURL,
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

          this.carSellForm.patchValue({
            ...data,
            car: this.car_data?.id,
            client: data?.client.data.id,
          });
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
    return this.validationsService.hasRequiredError(this.carSellForm, input);
  };

  //*************************************************************************************************
  //  Boton Guardar
  //*************************************************************************************************
  public submit() {
    //Tengo el id del carro en la tabla cars, no es el mismo
    const id = this.car_data?.id;

    this.focus_net_sell = false;
    this.focus_gross_sell = false;
    this.focus_iva = false;

    let xnet_sell: number = Number(this.carSellForm.get('net_sell')!.value);
    let xiva_sell: number = Number(this.carSellForm.get('iva_sell')!.value);
    let xgross_sell: number = Number(this.carSellForm.get('gross_sell')!.value);

    this.carSellForm.patchValue({
      gross_sell: xgross_sell.toFixed(this.total_decimales),
      net_sell: xnet_sell.toFixed(this.total_decimales),
      iva_sell: xiva_sell.toFixed(this.total_decimales),
    });

    this.carSellForm.updateValueAndValidity();

    if (!this.carSellForm.valid) {
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Form Data Errors!!!!',
      });

      return;
    }

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

    /*carsSellURL = 
     get carsSellURL(): string {
    return `${ this.apiUrl }/cars-sell-data`;
  }
    */



    this.requestService
      .Get(this.apiHelperService.carsSellURL + '?' + query)
      .subscribe((res) => {
        const data = res?.data[0]?.attributes;

        //2 --- si no existe creo uno nuevo si existe lo modifico
        if (data === undefined) {
          this.requestService
            .Post(this.apiHelperService.carsSellURL, this.carSellForm.value)
            .subscribe(() =>
             //Actualizar el carro -- campo selled = true
              {this.actualizarCarSelled( this.carSellForm.value.car)
              this.notificationService.riseNotification({
                color: 'success',
                data: 'Neuwagen eingelagert verkauft',
              })}
            );
        } else {
          const id_venta = res?.data[0]?.id;       
          this.requestService
            .Put(
              this.apiHelperService.carsSellURL + '/' + id_venta,
              this.carSellForm.value
            )
            .subscribe(() =>{
             //Actualizar el carro -- campo selled = true
              this.actualizarCarSelled( this.carSellForm.value.car)

           
              this.notificationService.riseNotification({
                color: 'success',
                data: 'Fahrzeug verkauft',
              })
            }
            );
        }

       

        // this.carSellForm.patchValue({
        //   ...data,
        //   car: this.car_data?.id,
        //   client: data?.client.data.id,
        // });
      });
  }

  public actualizarCarSelled(carID:any) {
    this.requestService
    .Put(
      this.apiHelperService.carsURL + '/' + carID,
      {"selled": true}
    )
    .subscribe(() =>
    this.notificationService.riseNotification({
      color: 'success',
      data: 'Car eliminated from stock',
    })
    );
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
            this.notificationService.riseNotification({
              color: 'success',
              data: 'New customer saved',
            });
            this.clientsOptions.push(res.data);
            this.autoComplete!.nativeElement.value = `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;
            this.carSellForm.patchValue({ client: res.data.id });
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

  public generatePdf(type: ExportType) {
    this.requestService
      .downloadPDF(this.apiHelperService.pdfURL, {
        type: type,
        id: <string>this.car_data?.id,
      })
      .subscribe((res) => {
        const name: string =
          type === ExportType.net_export ? `Rechnung` : `Verkaufsrechnung`;
        saveAs(
          new Blob([res], { type: 'application/pdf' }),
          `${name} no.${
            this.carSellForm.controls['invoice_number'].value
          } (${moment().format('MM.DD.YYYY')}).pdf`
        );
      });
  }

  private clearIvaSell = () => {
    this.carSellForm.get('iva_sell')!.setValue(null);
    this.carSellForm.get('iva_sell')!.markAsUntouched();
    this.carSellForm.get('iva_sell')!.markAsPristine();
    this.carSellForm.get('iva_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('iva_sell')!.disable();
    this.carSellForm.patchValue({ net_sell: null, iva_sell: null });
    this.carSellForm.updateValueAndValidity();
    this.isIvaActive = false;
  };

  private updateCosts = () => {
    const value: number = this.carSellForm.get('gross_sell')!.value;
    // this.carSellForm.patchValue({
    //   net_sell: value * this.factorNet,
    //   iva_sell: value * this.factorIva
    // });
    // this.carSellForm.updateValueAndValidity();
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
      case 'net_sell':
        this.focus_net_sell = true;
        this.focus_gross_sell = false;
        this.focus_iva = false;

        break;

      case 'gross_sell':
        this.focus_net_sell = false;
        this.focus_gross_sell = true;
        this.focus_iva = false;

        break;

      case 'iva_sell':
        this.focus_net_sell = false;
        this.focus_gross_sell = false;
        this.focus_iva = true;

        break;

      default:
        this.focus_net_sell = false;
        this.focus_gross_sell = false;
        this.focus_iva = false;
        break;
    }
  }

  focusOutFunction(event: any) {
    var value = event.target.value!;

    var strvalue = parseFloat(value).toFixed(2);

    switch (event.target.name) {
      case 'net_sell':
        this.focus_net_sell = false;
        this.carSellForm.patchValue({
          net_sell: strvalue,
        });
        break;

      case 'gross_sell':
        this.focus_gross_sell = false;

        this.carSellForm.patchValue({
          gross_sell: strvalue,
        });
        break;

      case 'iva_sell':
        this.focus_iva = false;

        this.carSellForm.patchValue({
          iva_sell: strvalue,
        });
        break;

      default:
        this.focus_net_sell = false;
        this.focus_gross_sell = false;
        this.focus_iva = false;
        break;
    }
  }
}
