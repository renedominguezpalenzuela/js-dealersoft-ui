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

import { MatTabChangeEvent } from '@angular/material/tabs';

import { Router, ActivatedRoute } from '@angular/router';

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
import { Location } from '@angular/common';

import { CreateInvoiceService } from '../../../servicios/create-invoice.service';

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

import { ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { CalculosService } from './../../../servicios/calculos.service';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
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
export class SellFormComponent implements OnInit, OnChanges, AfterViewInit {
  public authUser: User | null = null;
  public isAuth: boolean = false;

  focus_net_sell = false;
  focus_gross_sell = false;
  focus_iva = false;

  total_decimales = 2;

  // last_invoice_number: number = 220000;

  isChecked: null | boolean = null;

  actualizando_radio_buttons = false;

  // public boton_salvar_disabled = false;
  @Input() public boton_salvar_disabled!: boolean | undefined;

  car_id = 0;

  public selected_tab: number = 0;

  car_selled_id: number = 0;

  selected_option_a25 = false;
  selected_option_MnSt = false;
  selected_option_Export = false;

  puede_solo_iva = true;
  puede_solo_a25 = true;

  // @Input() public car: Car | undefined;
  @Input() public car_data: Car | undefined;

  public existeCompraConA25: boolean = false;

  public carSellForm = this.formBuilder.group({
    car_name: [null, [Validators.required]],
    car: [null, [Validators.required]],
    client: [null, [Validators.required]],
    invoice_number: [null, [Validators.min(0)]],
    invoice_date: [null, []],
    kv_date: [null, [Validators.min(0)]],
    lieferung: [null, []],
    zahlunsart: [null],

    net_sell: [null, [Validators.required, Validators.min(0)]],
    iva_sell: [{ value: null, disabled: true }, [Validators.min(0)]],
    gross_sell: [
      { value: null, disabled: true },
      [Validators.required, Validators.min(0)],
    ],

    a25: [true, [Validators.required]],
    iva: [false, [Validators.required]],
    export: [false, [Validators.required]],

    bemerkungencheck2page: [false, []],
    bemerkunhen: [null],
    bemerkunhen2: [null],
    bemerkunhen2page: [null],
    selled: [true],
    abholtermin: [null, [Validators.min(0)]],
  });
  // public factorNet: number = 0.8403;
  // public factorIva: number = 0.1597;

  public factorIva: number = 0.19;

  @Input() public carsOptions: Car[] = [];
  @Input() public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = [];
  public isIvaActive: boolean = false;
  private existenDatosGuardadosenBD: boolean = false;
  private primeraVez: boolean = true;

  //TEST
  private readonly jwt: string;

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
    private readonly authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    location: Location,
    private readonly createInvoice: CreateInvoiceService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private readonly httpClient: HttpClient,

    private readonly activatedRoute: ActivatedRoute,
    private readonly calculos: CalculosService
  ) {
    this.route = route;

    this.route.params.subscribe((params) => {
      if (params['existeCompraConA25'] != null) {
        this.existeCompraConA25 = Boolean(
          JSON.parse(params['existeCompraConA25'])
        );
      }

      this.actualizando_radio_buttons = true;
      if (this.existeCompraConA25) {
        this.carSellForm.patchValue({ iva: false, export: false, a25: true });
        this.activarA25();
      } else {
        this.carSellForm.patchValue({ iva: true, export: false, a25: false });
        this.activarIVA();
      }

      this.actualizando_radio_buttons = false;
    });

    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
  }

  public calcularIVA() {
    let vGross_sell: number = this.calculos.parseGermanNumber(
      this.carSellForm.get('gross_sell')!.value
    );
    let vNet_sell: number = this.calculos.parseGermanNumber(
      this.carSellForm.get('net_sell')!.value
    );
    let vIva_sell: number = this.calculos.parseGermanNumber(
      this.carSellForm.get('iva_sell')!.value
    );

    const respuesta = this.calculos.calcularIVA(
      vNet_sell,
      vGross_sell,
      vIva_sell
    );

    this.carSellForm.patchValue({
      net_sell: this.calculos.createGermmanNumber(respuesta.net),
      gross_sell: this.calculos.createGermmanNumber(respuesta.gross),
      iva_sell: this.calculos.createGermmanNumber(respuesta.iva),
    });

    this.carSellForm.updateValueAndValidity();

    // let vNet_sell: number = this.carSellForm.get('net_sell')!.value;
    // let vGross_sell: number = this.carSellForm.get('gross_sell')!.value;
    // let vIva: number = this.carSellForm.get('iva')!.value;

    // if (vNet_sell != null && vNet_sell != 0) {
    //   vIva = Number(vNet_sell * this.factorIva);
    //   vGross_sell = Number(vNet_sell) + vIva;
    //   this.carSellForm.patchValue({
    //     iva_sell: vIva.toFixed(this.total_decimales),
    //     gross_sell: vGross_sell.toFixed(this.total_decimales),
    //   });
    // } else {
    //   if (vGross_sell != null && vGross_sell != 0) {
    //     vNet_sell = vGross_sell / (1 + this.factorIva);
    //     vIva = vGross_sell - vNet_sell;
    //     this.carSellForm.patchValue({
    //       iva_sell: vIva.toFixed(this.total_decimales),
    //       net_sell: vNet_sell.toFixed(this.total_decimales),
    //     });
    //   }
    // }
    // this.carSellForm.updateValueAndValidity();
  }

  public activarIVA() {
    if (this.boton_salvar_disabled) return;
    // this.carSellForm.get('iva_sell')!.setValue(null);
    this.carSellForm.get('iva_sell')!.markAsUntouched();
    this.carSellForm.get('iva_sell')!.markAsPristine();
    this.carSellForm.get('iva_sell')!.addValidators(Validators.required);
    this.carSellForm.get('iva_sell')!.enable();

    // this.carSellForm.get('net_sell')!.setValue(null);
    this.carSellForm.get('net_sell')!.markAsUntouched();
    this.carSellForm.get('net_sell')!.markAsPristine();
    this.carSellForm.get('net_sell')!.addValidators(Validators.required);
    this.carSellForm.get('net_sell')!.enable();

    // this.carSellForm.get('gross_sell')!.setValue(null);
    this.carSellForm.get('gross_sell')!.markAsUntouched();
    this.carSellForm.get('gross_sell')!.markAsPristine();
    this.carSellForm.get('gross_sell')!.addValidators(Validators.required);
    this.carSellForm.get('gross_sell')!.enable();

    // this.carSellForm.updateValueAndValidity();
    this.isIvaActive = true;
    this.calcularIVA();

    this.selected_option_a25 = false;
    this.selected_option_Export = false;
    this.selected_option_MnSt = true;
  }

  public activarExport() {
    if (this.boton_salvar_disabled) return;
    this.carSellForm.get('iva_sell')!.setValue(null);
    this.carSellForm.get('iva_sell')!.markAsUntouched();
    this.carSellForm.get('iva_sell')!.markAsPristine();
    this.carSellForm.get('iva_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('iva_sell')!.disable();

    this.carSellForm.get('net_sell')!.markAsUntouched();
    this.carSellForm.get('net_sell')!.markAsPristine();
    this.carSellForm.get('net_sell')!.addValidators(Validators.required);
    this.carSellForm.get('net_sell')!.enable();

    this.carSellForm.get('gross_sell')!.setValue(null);
    this.carSellForm.get('gross_sell')!.markAsUntouched();
    this.carSellForm.get('gross_sell')!.markAsPristine();
    this.carSellForm.get('gross_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('gross_sell')!.disable();

    // this.carSellForm.updateValueAndValidity();
    this.isIvaActive = false;
    // this.calcularIVA();

    this.selected_option_a25 = false;
    this.selected_option_Export = true;
    this.selected_option_MnSt = false;
  }

  public desactivarIVA() {
    if (this.boton_salvar_disabled) return;
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

    this.carSellForm.patchValue({ gross_sell: null, iva_sell: null });
    // this.carSellForm.updateValueAndValidity();

    this.isIvaActive = false;
  }

  public activarA25() {
    if (this.boton_salvar_disabled) return;
    this.carSellForm.get('iva_sell')!.setValue(null);
    this.carSellForm.get('iva_sell')!.markAsUntouched();
    this.carSellForm.get('iva_sell')!.markAsPristine();
    this.carSellForm.get('iva_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('iva_sell')!.disable();

    this.carSellForm.get('net_sell')!.setValue(null);
    this.carSellForm.get('net_sell')!.markAsUntouched();
    this.carSellForm.get('net_sell')!.markAsPristine();
    this.carSellForm.get('net_sell')!.removeValidators(Validators.required);
    this.carSellForm.get('net_sell')!.disable();

    // this.carSellForm.get('gross_sell')!.setValue(null);
    this.carSellForm.get('gross_sell')!.markAsUntouched();
    this.carSellForm.get('gross_sell')!.markAsPristine();
    this.carSellForm.get('gross_sell')!.addValidators(Validators.required);
    this.carSellForm.get('gross_sell')!.enable();

    this.carSellForm.patchValue({ net_sell: null, iva_sell: null });
    // this.carSellForm.updateValueAndValidity();

    this.isIvaActive = false;

    this.selected_option_a25 = true;
    this.selected_option_Export = false;
    this.selected_option_MnSt = false;
  }

  ngOnInit(): void {
    this._locale = 'de';
    this._adapter.setLocale(this._locale);

    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;
    });

    this.carSellForm.get('a25')!.valueChanges.subscribe((change: boolean) => {
      if (this.actualizando_radio_buttons) return;
      if (this.boton_salvar_disabled) return;
      if (this.primeraVez) return;
      if (change) {
        this.actualizando_radio_buttons = true;
        this.carSellForm.patchValue({ iva: false, export: false });
        this.activarA25();
      } else {
        this.actualizando_radio_buttons = true;
        if (this.puede_solo_a25) {
          this.carSellForm.patchValue({ export: true, iva: false });
        } else {
          this.carSellForm.patchValue({ export: false, iva: true });
        }
        this.activarIVA();
      }

      this.actualizando_radio_buttons = false;
    });

    this.carSellForm.get('iva')!.valueChanges.subscribe((change: boolean) => {
      if (this.boton_salvar_disabled) return;
      if (this.actualizando_radio_buttons) return;
      if (this.primeraVez) return;

      if (change) {
        this.actualizando_radio_buttons = true;
        this.carSellForm.patchValue({ export: false, a25: false });
        this.activarIVA();
      } else {
        this.actualizando_radio_buttons = true;
        this.carSellForm.patchValue({ export: true, a25: false });
        this.activarExport();
        if (this.puede_solo_iva) {
          this.carSellForm.patchValue({ export: true, iva: false });
        } else {
          this.carSellForm.patchValue({ export: true, a25: false });
        }
      }

      this.actualizando_radio_buttons = false;
    });

    this.carSellForm
      .get('export')!
      .valueChanges.subscribe((change: boolean) => {
        if (this.boton_salvar_disabled) return;
        if (this.actualizando_radio_buttons) return;
        if (this.primeraVez) return;
        if (change) {
          this.actualizando_radio_buttons = true;
          this.carSellForm.patchValue({ a25: false, iva: false });
          this.activarExport();
        } else {
          this.actualizando_radio_buttons = true;
          this.carSellForm.patchValue({ a25: false, iva: true });
          this.activarIVA();
        }

        this.actualizando_radio_buttons = false;
      });

    //--------------------------------------------------------------------------------------------------
    //  Calculos
    //--------------------------------------------------------------------------------------------------

    this.carSellForm.get('net_sell')!.valueChanges.subscribe(() => {
      if (this.boton_salvar_disabled) return;

      if (this.focus_net_sell) {
        const value: number = this.calculos.parseGermanNumber(
          this.carSellForm.get('net_sell')!.value
        );

        let vIva = value * this.calculos.factorIva;
        let vGross_sell = value + vIva;

        if (!this.isIvaActive) {
          vIva = 0;
          vGross_sell = 0;
        }

        this.carSellForm.patchValue({
          iva_sell: this.calculos.createGermmanNumber(vIva),
          gross_sell: this.calculos.createGermmanNumber(vGross_sell),
        });
        this.carSellForm.updateValueAndValidity();
      }
    });

    this.carSellForm.get('gross_sell')!.valueChanges.subscribe(() => {
      if (this.boton_salvar_disabled) return;

      // if (!this.isIvaActive) {
      if (this.focus_gross_sell) {
        const value: number = this.calculos.parseGermanNumber(
          this.carSellForm.get('gross_sell')!.value
        );
        const iva: number =
          (value * this.calculos.factorIva) / (1 + this.calculos.factorIva);

        let vNet_sell = value - iva;
        let vIva = iva;

        if (!this.isIvaActive) {
          vNet_sell = 0;
          vIva = 0;
          // gross_buy=0;
        }

        this.carSellForm.patchValue({
          iva_sell: this.calculos.createGermmanNumber(vIva),
          net_sell: this.calculos.createGermmanNumber(vNet_sell),
        });
        this.carSellForm.updateValueAndValidity();
      }
    });

    this.carSellForm.get('iva_sell')!.valueChanges.subscribe(() => {
      if (this.boton_salvar_disabled) return;

      // if (!this.isIvaActive) {
      if (this.focus_iva) {
        const value: number = this.calculos.parseGermanNumber(
          this.carSellForm.get('iva_sell')!.value
        );
        let netto: number = value / this.calculos.factorIva;

        let vGross_sell = netto + value;
        let vNetto = netto;

        if (!this.isIvaActive) {
          netto = this.carSellForm.get('net_sell')?.value;
          vGross_sell = 0;
        }

        this.carSellForm.patchValue({
          gross_sell: this.calculos.createGermmanNumber(vGross_sell),
          net_sell: this.calculos.createGermmanNumber(vNetto),
        });
        this.carSellForm.updateValueAndValidity();
      }
    });

    // this.carSellForm.get('gross_sell')!.valueChanges.subscribe(() => {
    //   if (this.isIvaActive) this.updateCosts();
    // });

    //Buscar si existe el contrato de compra del carro
    //si existe y es A25 entonces setear a A25 el contrato de venta

    // this.existeCompraconA25 = this.route.snapshot.paramMap.get('existeCompraconA25');
    this.primeraVez = false;
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

  desHabilitarControles() {
    for (const field in this.carSellForm.controls) {
      this.carSellForm.controls[field].disable();
    }
  }

  habilitarControles() {
    for (const field in this.carSellForm.controls) {
      this.carSellForm.controls[field].enable();
    }
  }

  //Se actualiza el formulario con los datos de la BD
  ngOnChanges(changes: SimpleChanges): void {
    if (this.car_data?.attributes.can_save) {
      //this.boton_salvar_disabled=false;
      this.habilitarControles();
    } else {
      // this.boton_salvar_disabled=true;
      this.desHabilitarControles();
    }

    if (this.boton_salvar_disabled === true) {
      this.desHabilitarControles();
    }

    //Constrains de a25 e iva en funcion de lo salvado en buyCar
    if (
      this.car_data?.attributes.a25 === true &&
      this.car_data?.attributes.iva === false
    ) {
      this.puede_solo_iva = false;
      this.puede_solo_a25 = true;
    }

    if (
      this.car_data?.attributes.a25 === false &&
      this.car_data?.attributes.iva === true
    ) {
      this.puede_solo_iva = true;
      this.puede_solo_a25 = false;
    }

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

          // if (data === undefined) {
          //   this.boton_salvar_disabled = false;
          // } else {
          //   this.boton_salvar_disabled = true;
          // }

          if (data != null) {
            this.existenDatosGuardadosenBD = true;
            this.car_selled_id = res?.data[0].id;
          }
          this.actualizando_radio_buttons = true;

          this.carSellForm.patchValue({
            ...data,
            car: this.car_data?.id,
            client: data?.client.data.id,
            gross_sell: this.calculos.createGermmanNumber(data?.gross_sell),
            net_sell: this.calculos.createGermmanNumber(data?.net_sell),
            iva_sell: this.calculos.createGermmanNumber(data?.iva_sell),
          });

          // this.carSellForm.patchValue({
          //   gross_sell: data?.gross_sell?.toFixed(this.total_decimales),
          //   net_sell: data?.net_sell?.toFixed(this.total_decimales),
          //   iva_sell: data?.iva_sell?.toFixed(this.total_decimales),
          // });

          if (this.carSellForm.get('iva')!.value) {
            this.activarIVA();
          }

          if (this.carSellForm.get('a25')!.value) {
            this.activarA25();
          }

          if (this.carSellForm.get('export')!.value) {
            this.activarExport();
          }

          this.carSellForm.updateValueAndValidity();

          this.actualizando_radio_buttons = false;
        });
    }
    if (changes?.['clientsOptions'] && this.clientsOptions) {
      this.filteredOptions = this.clientsOptions;
    }
  }

  ngAfterViewInit(): void {
    this.selected_option_a25 = this.carSellForm.get('a25')!.value;
    this.selected_option_MnSt = this.carSellForm.get('iva')!.value;
    this.selected_option_Export = this.carSellForm.get('export')!.value;

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

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.carSellForm, input);
  };

  //--------------------------------------------------------------------------------
  //  CrearInvoice
  //--------------------------------------------------------------------------------
  // Crear tupla en tabla invoices, toma los datos desde el formulario

  // -----  Cambiar TAB ----- 

  crearInvoice() {

    //si selected tab es rechnung
    if (this.selected_tab == 1) {
      let precio = 0;
      if (this.carSellForm.get('a25')!.value === true) {
        precio = this.calculos.parseGermanNumber(
          this.carSellForm.get('gross_sell')!.value
        );
      }

      if (this.carSellForm.get('iva')!.value === true) {
        precio = this.calculos.parseGermanNumber(
          this.carSellForm.get('net_sell')!.value
        );
      }

      if (this.carSellForm.get('export')!.value === true) {
        precio = this.calculos.parseGermanNumber(
          this.carSellForm.get('net_sell')!.value
        );
      }

      let datosInvoice = {
        invoice_number: this.carSellForm.get('invoice_number')!.value,
        reference_invoice_number: this.carSellForm.get('invoice_number')!.value,
        title:
          this.car_data?.attributes.name +
          ', FIN: ' +
          this.car_data?.attributes.car_identifier,
        description: this.carSellForm.get('bemerkunhen')!.value,
        kv_date: this.carSellForm.get('kv_date')!.value,
        date: this.carSellForm.get('invoice_date')!.value,
        delivery_date: this.carSellForm.get('lieferung')!.value,
        // client: { data: this.carSellForm.get('client')!.value },
        client: this.carSellForm.get('client')!.value,
        owner: this.authUser?.id,
        a25: this.carSellForm.get('a25')!.value,
        iva: this.carSellForm.get('iva')!.value,
        places: [
          {
            article:
              this.car_data?.attributes.name +
              ', FIN: ' +
              this.car_data?.attributes.car_identifier,
            quantity: 1,
            unit_price: precio,
          },
        ],
        car_sell_data: this.car_selled_id,
        car: this.car_data?.id,
      };

      this.createInvoice.guardarInvoiceDatosEnBD(datosInvoice).subscribe(() => {
        // this.actualizarCarSelled(this.carSellForm.value.car, true);
        this.actualizarCarSelled(this.car_data?.id, true);

        //Creada nueva invoice
        this.notificationService.riseNotification({
          color: 'success',
          data: 'Neue Rechnung  generiert',
        });
      });
    }
  }
  //*************************************************************************************************
  //  Boton Guardar
  //*************************************************************************************************
  public submit() {
    this.salvarEImprimir(false, ExportType.none, false);
  }

  public actualizarCarSelled(carID: any, showMessage: boolean) {
    ///solo pasar a vendido si se genero el numero de invoice

    if (!this.carSellForm.get('invoice_number')!.value) {
      return;
    }

    this.requestService
      .Put(this.apiHelperService.carsURL + '/' + carID, {
        selled: true,
        can_save: false,
      })
      .subscribe(() => {
        if (showMessage) {
          let texto_mensaje = 'Bericht generiert';
        
        }
      });
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
            //this.autoComplete!.nativeElement.value = `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;
            this.autoComplete!.nativeElement.value = res.data.attributes
              .company_name
              ? `${res.data.attributes.company_name}`
              : `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;
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
        //return `${customer.attributes.first_name} ${customer.attributes.last_name}`;
        return customer.attributes.company_name
          ? customer.attributes.company_name
          : `${customer.attributes.first_name} ${customer.attributes.last_name}`;
      else return '';
    }
    return '';
  };

  // selected_tab = 0; Kaufvertrag 
  // selected_tab = 1; Rechnung
  // selected_option_a25 = false;
  // selected_option_MnSt = false;
  // selected_option_Export = false;

  private imprimir(type: ExportType) {
    this.selected_option_a25 = this.carSellForm.get('a25')!.value;
    this.selected_option_MnSt = this.carSellForm.get('iva')!.value;
    this.selected_option_Export = this.carSellForm.get('export')!.value;

    let tipo = '/';

    let nombre_reporte = 'report.pdf';
    // nombre_reporte = `${name} no.${this.carSellForm.controls['invoice_number'].value} (${moment().format('MM.DD.YYYY')}).pdf`
//  ------  CAMBIAR TAG ----------
    if (this.selected_tab == 1) {
      //invoice
      nombre_reporte = `Rechnung ${this.carSellForm.controls['invoice_number'].value} - ${this.car_data?.attributes.car_identifier}.pdf`;
    } else if (this.selected_tab == 0) {
      nombre_reporte = `Kaufvertrag ${this.car_data?.attributes.name} - ${this.car_data?.attributes.car_identifier}.pdf`;
    }

    switch (type) {
      case 'privado':
        //  ------  CAMBIAR TAG ----------
        if (this.selected_tab == 1) {
          if (this.selected_option_a25) {
            tipo = 'reports/rechnung/a25';
          }

          if (this.selected_option_MnSt) {
            tipo = 'reports/rechnung/iva';
          }
        }
//  ------  CAMBIAR TAG ----------
        if (this.selected_tab == 0) {
          if (this.selected_option_a25) {
            tipo = 'reports/kaufvertrag/a25';
          }

          if (this.selected_option_MnSt) {
            tipo = 'reports/kaufvertrag/iva';
          }
        }

        break;

      case 'gewerbe':
        tipo = 'reports/gewerbe/a25';

        break;

      case 'netto':
        //  ------  CAMBIAR TAG ----------
        if (this.selected_tab == 1) {
          tipo = 'reports/netto/rechnung/export';
        } else {
          tipo = 'reports/netto/kaufvertrag/export';
        }
        break;

      case 'netto-eu':
        //  ------  CAMBIAR TAG ----------
        if (this.selected_tab == 1) {
          tipo = 'reports/netto-eu/rechnung/export';
        } else {
          tipo = 'reports/netto-eu/kaufvertrag/export';
        }

        break;

      default:
        tipo = '/';
        break;
    }

    if (tipo == '/') {
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Bericht noch nicht festgelegt',
      });
      return;
    }

    this.requestService
      .downloadPDF(this.apiHelperService.pdfURL, {
        type: tipo,
        id: <string>this.car_data?.id,
      })
      .subscribe((res) => {
        const name: string =
          type === ExportType.net_export ? `Rechnung` : `Verkaufsrechnung`;
        saveAs(new Blob([res], { type: 'application/pdf' }), nombre_reporte);
      });
  }

  public generatePdf(type: ExportType) {
    if (!this.boton_salvar_disabled) {
      this.salvarEImprimir(true, type, false);
    } else {
      this.imprimir(type);
    }
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
    // const value: number = this.carSellForm.get('gross_sell')!.value;
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
        option.attributes.email.toLowerCase().includes(filterValue) ||
        option.attributes.company_name.toLowerCase().includes(filterValue)
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

    //var strvalue = parseFloat(value).toFixed(2);

    var strvalue1 = this.calculos.parseGermanNumber(value);
    var strvalue = this.calculos.createGermmanNumber(strvalue1);

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

  public total_lineas_comentario1: number = 4;   //en realidad solo salen 4?
  public total_lineas_comentario2: number = 35;
  public total_characters_por_linea: number =70;  //70


  //Evitar que sean mas de 4 lineas en los comentarios1
  public keydown(event: any) {
    let cadena_texto = event.target.value;
    // const lineas = (cadena_texto.match(/\n/g) || []).length + 1;

    const enters = cadena_texto.match(/\n/g) || [];
    const total_lineas = enters.length + 1;

    let texto_valido = false;

    if (total_lineas >= this.total_lineas_comentario1  && event.keyCode == 13) {
      texto_valido = false;
    } else {
      texto_valido = true;
    }

    if (texto_valido) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  


  public keypress(event: any) {

   

    
    const fieldName = event.target.attributes.formcontrolname.value;

    
 
    let cadena_texto = event.target.value;
    let pressed_enter = false;
   


    let lineas = cadena_texto.split(/\n/g) || [];  //si esta vacia le asigna []
    let total_lineas = lineas.length;

    
    
    let ultima_linea = lineas[total_lineas-1];

    let terminar = false;
    

    if (ultima_linea.length >= this.total_characters_por_linea) {
     

      const words = ultima_linea.split(' ') || [];

      let first_line_part = '';
      let second_line_part = '';

      let linea_completa = false;

    


      words.forEach((unaWord: any) => {
        
        unaWord = unaWord.trimStart();

       
        
                
        if (unaWord.length>=this.total_characters_por_linea - 15) {

           //  first_line_part = unaWord.substring(0, this.total_characters_por_linea );
           //  second_line_part = unaWord.substring(this.total_characters_por_linea )  + ' '; 
           event.preventDefault();
           terminar = true;

          // return false;

            
        } else {
          if (first_line_part.length + unaWord.length <this.total_characters_por_linea) {
            first_line_part+=' '+unaWord;
          } else {
            linea_completa = true;
          }

          if (linea_completa) {
            second_line_part+=' '+unaWord;
          }
         
        }

        

      });



       total_lineas = lineas.length;


    
      if (total_lineas <= 2 && second_line_part != '' && second_line_part != ' ') {
        lineas[total_lineas - 1] = this.eliminarEspacio(first_line_part);        
        lineas.push(this.eliminarEspacio(second_line_part+'\n'));
       
      }



      

    }


    

  
    


    switch (fieldName) {
      case "bemerkunhen":
       // this.carSellForm.patchValue({bemerkunhen : lineas_finales_1.join('\n') });     
       this.carSellForm.patchValue({bemerkunhen : lineas.join('\n') });     
        break;
      case "bemerkunhen2":
       // this.carSellForm.patchValue({bemerkunhen2 : lineas_finales_1.join('\n') });     
        this.carSellForm.patchValue({bemerkunhen2 : lineas.join('\n') });     
        break;
      case "bemerkunhen2page":
        
       // this.carSellForm.patchValue({bemerkunhen2page : lineas_finales_1.join('\n') });     
        this.carSellForm.patchValue({bemerkunhen2page : lineas.join('\n') });     
        break;  
    
      default:
        break;
    }


    

   
   

    return !terminar;
  }

   eliminarEspacio(linea:any) {

    let primerCaracter = linea.substring(0,1);
    let resultado ='';
    if (linea.length>1 && primerCaracter===' ')  {
      resultado = linea.trimStart();
    } else {
      resultado = linea;
    }

    return resultado;

  }

  //Evitar que sean mas de 4 lineas en los comentarios2
  public keydown2(event: any) {
    let cadena_texto = event.target.value;
    const lineas = (cadena_texto.match(/\n/g) || []).length + 1;

    if (lineas >= 35 && event.keyCode == 13) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public onNativeChange(e: any) {
    this.isChecked = e.target.checked;
  }

  // @ViewChildren('childTabs') childTabs: QueryList<MatTabGroup>;
  // onTabChange(event: any){
  //   this.activeIndex = event.index;

  //   this.childTabs.forEach(childTab => {
  //      childTab.realignInkBar();
  //   });

  // }

  //determinar que tab fue seleccionado
  onTabChange(event: MatTabChangeEvent) {
    this.selected_tab = event.index;
  

    //  ------  CAMBIAR TAG ----------
    //TODO: REVISAR
    if (this.selected_tab == 1) {
      // this.isChecked = false;
      this.carSellForm
        .get('invoice_number')!
        .addValidators(Validators.required);
    } else {
      this.carSellForm
        .get('invoice_number')!
        .removeValidators(Validators.required);

      if (this.isChecked === null) {
        let sell = this?.car_data?.attributes.sell;

        if (sell?.bemerkungencheck2page) {
          this.isChecked = true;
        } else {
          this.isChecked = false;
        }
      }
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.carSellForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name + ', ' + controls[name].value);
      }
    }
    return invalid;
  }

  public salvarEImprimir(
    imprimir: any,
    type: ExportType,
    crear_invoice: boolean
  ) {
    // let xnet_sell: number = 0;
    // let xiva_sell: number = 0;
    // let xgross_sell: number = 0;

    // if (this.carSellForm.get('net_sell')?.value === null) {
    //   xnet_sell = 0;
    // } else {
    //   xnet_sell = Number(this.carSellForm.get('net_sell')?.value);
    // }

    // if (this.carSellForm.get('iva_sell')?.value === null) {
    //   xiva_sell = 0;
    // } else {
    //   xiva_sell = Number(this.carSellForm.get('iva_sell')?.value);
    // }

    // if (this.carSellForm.get('gross_sell')?.value === null) {
    //   xgross_sell = 0;
    // } else {
    //   xgross_sell = Number(this.carSellForm.get('gross_sell')?.value);
    // }

    // const datos = {
    //   ...this.carSellForm.value,
    //   gross_sell: xgross_sell.toFixed(this.total_decimales),
    //   net_sell: xnet_sell.toFixed(this.total_decimales),
    //   iva_sell: xiva_sell.toFixed(this.total_decimales),
    // };

    const datos = {
      ...this.carSellForm.value,
      gross_sell: this.calculos.parseGermanNumber(
        this.carSellForm.get('gross_sell')?.value
      ),
      net_sell: this.calculos.parseGermanNumber(
        this.carSellForm.get('net_sell')?.value
      ),
      iva_sell: this.calculos.parseGermanNumber(
        this.carSellForm.get('iva_sell')?.value
      ),
    };

    const id = this.car_data?.id;

    this.focus_net_sell = false;
    this.focus_gross_sell = false;
    this.focus_iva = false;

    //this.carSellForm.updateValueAndValidity();

    if (!this.carSellForm.valid) {
      console.log('Error in form: carSellForm');

      console.log(this.findInvalidControls());

      this.notificationService.riseNotification({
        color: 'warning',
        data: 'fehlende Angaben!!!!',
      });

      return;
    }

    //Invoice number
    const valorFormularioInvoice_Number =
      this.carSellForm.get('invoice_number')!.value;

    //console.log("Invoice number nulo")
    

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
      .Get(this.apiHelperService.carsSellURL + '?' + query)
      .subscribe((res) => {
        const data = res?.data[0]?.attributes;

        //2 --- si no existe creo tupla nueva en carSellData si existe lo modifico
        if (data === undefined) {
          //this.carSellForm.value
          this.requestService
            .Post(this.apiHelperService.carsSellURL, datos)
            .subscribe((Datos_Salva) => {
              //Solo se elimina el carro cuando se crea el invoice number

              this.car_selled_id = Datos_Salva.data.id;

            

              this.notificationService.riseNotification({
                color: 'success',
                data: 'Bericht generiert',
              });

              if (crear_invoice) {
                this.crearInvoice();
              }

              if (imprimir) {
                this.imprimir(type);
              }

              if (this.boton_salvar_disabled) this.desHabilitarControles();
            });
        } else {
          //modificar tupla existente

          const id_venta = res?.data[0]?.id;
          this.car_selled_id = id_venta;

          //this.carSellForm.value
          this.requestService
            .Put(this.apiHelperService.carsSellURL + '/' + id_venta, datos)
            .subscribe(() => {
              //Actualizar el carro -- campo selled = true
              this.actualizarCarSelled(this.carSellForm.value.car, false);

            

              this.notificationService.riseNotification({
                color: 'success',
                data: 'Bericht generiert',
              });

              if (crear_invoice) {
                this.crearInvoice();
              }

              if (imprimir) {
                this.imprimir(type);
              }

              if (this.boton_salvar_disabled) this.desHabilitarControles();
            });
        }

        // this.carSellForm.patchValue({
        //   ...data,
        //   car: this.car_data?.id,
        //   client: data?.client.data.id,
        // });
      });
  }

  public generateInvoice_NumberHammer() {
    //Error se necesita la fecha lieferung para generar invoice_number
    let fechaLieferdatum = this.carSellForm.get('lieferung')!.value;

    if (fechaLieferdatum == null) {
      this.carSellForm.get('lieferung')!.markAsTouched();
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Lieferdatum ändern wird benötigt',
      });
      return;
    }

    //Error se necesita la fecha invoice_date para generar invoice_number
    let fechaRechnungsdatum = this.carSellForm.get('invoice_date')!.value;

    if (fechaRechnungsdatum == null) {
      this.carSellForm.get('invoice_date')!.markAsTouched();
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Rechnungsdatum wird benötigt',
      });
      return;
    }

    this.carSellForm.updateValueAndValidity();

    //Error en datos del formulario
    if (!this.carSellForm.valid) {
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'fehlende Angaben!!!!',
      });

      return;
    }

    this.createInvoice.generateInvoice_Number().subscribe((datos: any) => {
      // this.last_invoice_number = datos;
      this.carSellForm.patchValue({
        invoice_number: datos,
      });

      localStorage.setItem('can_save', false.toString());
      //this.desHabilitarControles();
      this.boton_salvar_disabled = true;

      // Solo salvar, no imprimir
      this.salvarEImprimir(false, ExportType.none, true);
    });
  }

  private generateOptions_TEST = () => {
    let myjwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsImlhdCI6MTY1ODE1OTAyMiwiZXhwIjoxNjYwNzUxMDIyfQ.YmxqFRX7VUgDEkY9YjPZcLu74tfKVyvs6IvO47ese1M';
    return {
      params: this.query_user(),
      headers: new HttpHeaders({ Authorization: `Bearer ${myjwt}` }),
    };
  };

  private query_user = () =>
    this.requestService.generateQuery({
      populate: ['logo', 'user'],
    });

  private query = () =>
    this.requestService.generateQuery({
      populate: ['owner', 'client', 'car', 'user', 'logo'],
    });

  public car_info: any;
  public car_buy_data: any;
  public logo: any;
  public me: any;

  public loadPaginatedData_TEST = (id: any) => {
    forkJoin([
      this.httpClient.get<any>(
        this.apiHelperService.meURL,
        this.generateOptions_TEST()
      ),
      // this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/?id=${ id }`),
      this.httpClient.get<any>(`${this.apiHelperService.carsURL}/${id}`),
      //this.httpClient.get<any>(this.apiHelperService.carsBuyURL, this.generateOptions_TEST()),
    ]).subscribe((res: any) => {
      // this.car_info = res[0].data2.filter((item: any) => item.id === id)[0];
      // this.car_buy_data = res[1].data.filter((item: any) => item.attributes.car.data.id === id)[0];

      //if (this.logo?.attributes.logo.data.attributes.url)   this.showLogo = true;

      this.me = res[0];
      let user_id = this.me.id;

      // this.logo = res[1].data.filter((item: any) => item.attributes.user.data.id === user_id)[0];

      this.car_info = res[1];

      this.car_buy_data = this.car_info.data.attributes.sell;

      //http://localhost:1337/api/logos?filters[user][id][$eq]=55&populate=logo

      this.httpClient
        .get<any>(
          `${this.apiHelperService.logosURL}?filters[user][id][$eq]=${user_id}&populate=logo`
        )
        .subscribe((dato: any) => {
          // this.logo = dato;
          // this.image_url=this.logo?.attributes.logo.data.attributes.url;
          // if (this.logo?.attributes.logo.data.attributes.url)   this.showLogo = true;
        });
    });
  };
}
