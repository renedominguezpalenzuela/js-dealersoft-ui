import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiHelperService, NotificationService, RequestService, ValidationsService } from '@core/services';
import { Car, Customer, FilterDeepOption } from '@core/interfaces';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss']
})
export class BuyFormComponent implements OnInit, OnChanges, AfterViewInit {
  
  //variable recibida desde el componente padre que contiene los datos provenientes del API
  @Input() public car_data: Car | undefined;

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
    net_buy: [null, [Validators.required, Validators.min(0)]],
    iva_buy: [{ value: null, disabled: true }, [Validators.min(0)]],
    gross_buy: [null, [Validators.required, Validators.min(0)]],
    // net_buy_adjustment: [null, [Validators.required, Validators.min(0)]],
       net_buy_adjustment: [null, [ Validators.min(0)]],
    year_interest_rate: [null, [Validators.required, Validators.min(0)]],
    total: [null, [Validators.required, Validators.min(0)]],
    buy_date: [null, [Validators.required]],
    a25: [true, [Validators.required]],
    iva: [false, [Validators.required]],
  });
  public factorNet: number = 0.8403;
  public factorIva: number = 0.1597;
  @Input() public carsOptions: Car[] = [];
  @Input() public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = [];
  public isIvaActive: boolean = false;
  @ViewChild('autoComplete') private autoComplete: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService,
    private readonly apiHelperService: ApiHelperService,
    private readonly matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  

    this.carBuyForm.get('iva')!.valueChanges.subscribe((change: boolean) => {
      if (change) {
        this.carBuyForm.get('iva_buy')!.enable();
        this.carBuyForm.get('iva_buy')!.addValidators(Validators.required);
        this.carBuyForm.updateValueAndValidity();
        this.isIvaActive = true;
        if (this.carBuyForm.get('gross_buy')!.value) this.updateCosts();
      }
    });
    this.carBuyForm.get('a25')!.valueChanges.subscribe((change: boolean) => {
      if (change) {
        this.carBuyForm.get('iva_buy')!.setValue(null);
        this.carBuyForm.get('iva_buy')!.markAsUntouched();
        this.carBuyForm.get('iva_buy')!.markAsPristine();
        this.carBuyForm.get('iva_buy')!.removeValidators(Validators.required);
        this.carBuyForm.get('iva_buy')!.disable();
        this.carBuyForm.patchValue({ net_buy: null, iva_buy: null });
        this.carBuyForm.updateValueAndValidity();
        this.isIvaActive = false;
      }
    });
    this.carBuyForm.get('gross_buy')!.valueChanges.subscribe(() => {
      if (this.isIvaActive) this.updateCosts();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes?.['car_data'] && this.car_data) {
   
       //Actualizar el nombre del carro en el formulario  a partir del valor recibido desde el paren
      this.carBuyForm.patchValue({ car_name:this.car_data.attributes.name });
      this.requestService.Get(this.apiHelperService.carsBuyURL, this.requestService.generateQuery({
        populate: ['car', 'client'],
        filters: [{
          field: '[car][id]',
          operator: FilterOperator.$eq,
          value: <string>this.car_data?.id,
          option: FilterDeepOption.$and
        }]
      })).subscribe((res) => {
        const data = res?.data[0]?.attributes;
        // console.log(data)
        this.carBuyForm.patchValue({ ...data, car: this.car_data?.id, client: data?.client?.data?.id });
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
                option: FilterDeepOption.$or
              },
              {
                field: 'last_name',
                operator: FilterOperator.$contains,
                value: $event.target.value,
                option: FilterDeepOption.$or
              },
              {
                field: 'email',
                operator: FilterOperator.$contains,
                value: $event.target.value,
                option: FilterDeepOption.$or
              },
            ]
          });
          this.requestService.Get(this.apiHelperService.clientsURL, query)
            .subscribe(res => {
              if (res.data.length > 0) this.filteredOptions = res.data;
              else this.filteredOptions = this.clientsOptions;
            });
        }
      })
  }

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.carBuyForm, input);
  };

  public submit() {
    if (this.carBuyForm.valid) {
      this.requestService.Post(this.apiHelperService.carsBuyURL, this.carBuyForm.value)
        .subscribe(() => {
          this.notificationService.riseNotification({
            color: 'success',
            data: 'Neuwagenkauf gespeichert'
          });
        });
    }
  }

  public addCustomer = ($event: MouseEvent) => {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    this.matDialog.open(CustomerFormComponent, {
      width: '650px',
      height: '530px'
    }).afterClosed().subscribe((out: boolean | { body: any }) => {
      if (typeof out !== 'boolean' && typeof out !== 'undefined') {
        const subscription = (res: any) => {
          this.notificationService.riseNotification({ color: 'success', data: 'New customer saved' });
          this.clientsOptions.push(res.data);
          this.autoComplete!.nativeElement.value = `${ res.data.attributes.first_name } ${ res.data.attributes.last_name }`;
          this.carBuyForm.patchValue({ client: res.data.id });
        }

        this.requestService.Post(this.apiHelperService.clientsURL, out.body).subscribe(subscription);
      }
    });
  }

  public displayFn = (id: string): string => {
    if (this.filteredOptions.length > 0) {
      const customer: Customer = <Customer>this.filteredOptions.find(elm => elm.id === id);
      if (customer) return `${ customer.attributes.first_name } ${ customer.attributes.last_name }`;
      else return '';
    }
    return '';
  }

  public generatePdf() {
    this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
      type: ExportType.vehicle,
      id: <string>this.car_data?.id
    }).subscribe(res => {
      saveAs(new Blob([res], { type: 'application/pdf' }),
        `Kaufvertrag (${ moment().format('YYYY-MM-DD') }).pdf`);
    });
  }

  private updateCosts = () => {
    const value: number = this.carBuyForm.get('gross_buy')!.value;
    this.carBuyForm.patchValue({
      net_buy: value * this.factorNet,
      iva_buy: value * this.factorIva
    });
    this.carBuyForm.updateValueAndValidity();
  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.clientsOptions
      .filter(option =>
        option.attributes.first_name.toLowerCase().includes(filterValue) ||
        option.attributes.last_name.toLowerCase().includes(filterValue) ||
        option.attributes.email.toLowerCase().includes(filterValue)
      );
  }
}
