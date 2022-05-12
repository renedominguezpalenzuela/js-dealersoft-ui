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
import { Car, Customer, FilterDeepOption } from '@core/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiHelperService, NotificationService, RequestService, ValidationsService } from '@core/services';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss']
})
export class SellFormComponent implements OnInit, OnChanges, AfterViewInit {

  isChecked = false;
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
    gross_sell: [null, [Validators.required, Validators.min(0)]],
    a25: [true, [Validators.required]],
    iva: [false, [Validators.required]],
    export: [false, [Validators.required]],
    BemerkungenCheck2Page:[false, [Validators.required]],
    bemerkunhen: [null],
    bemerkunhen2page:[null]
  });
  public factorNet: number = 0.8403;
  public factorIva: number = 0.1597;
  @Input() public carsOptions: Car[] = [];
  @Input() public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = [];
  public isIvaActive: boolean = false;
  public exportType = ExportType;
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
    this.carSellForm.get('iva')!.valueChanges.subscribe((change: boolean) => {
      if (change) {
        this.carSellForm.patchValue({ export: false, a25: false });
        this.carSellForm.get('iva_sell')!.enable();
        this.carSellForm.get('iva_sell')!.addValidators(Validators.required);
        this.carSellForm.updateValueAndValidity();
        this.isIvaActive = true;
        if (this.carSellForm.get('gross_sell')!.value) this.updateCosts();
      } else {
        this.clearIvaSell();
      }
    });
    this.carSellForm.get('a25')!.valueChanges.subscribe((change: boolean) => {
      if (change) {
        this.carSellForm.patchValue({ iva: false, export: false });
        this.clearIvaSell();
      }
    });
    this.carSellForm.get('export')!.valueChanges.subscribe((change: boolean) => {
      if (change) {
        this.carSellForm.patchValue({ a25: false, iva: false });
        this.clearIvaSell();
      }
    });
    this.carSellForm.get('gross_sell')!.valueChanges.subscribe(() => {
      if (this.isIvaActive) this.updateCosts();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['car_data'] && this.car_data) {

        //Actualizar el nombre del carro en el formulario  a partir del valor recibido desde el paren
        this.carSellForm.patchValue({ car_name:this.car_data.attributes.name });

      this.requestService.Get(this.apiHelperService.carsSellURL, this.requestService.generateQuery({
        populate: ['car', 'client'],
        filters: [{
          field: '[car][id]',
          operator: FilterOperator.$eq,
          value: <string>this.car_data?.id,
          option: FilterDeepOption.$and
        }]
      })).subscribe((res) => {
        
        const data = res?.data[0]?.attributes;
        
        this.carSellForm.patchValue({ ...data, car: this.car_data?.id, client: data?.client.data.id });
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
    return this.validationsService.hasRequiredError(this.carSellForm, input);
  };

  public submit() {
    if (this.carSellForm.valid) {
      this.requestService.Post(this.apiHelperService.carsSellURL, this.carSellForm.value)
        .subscribe(() => this.notificationService.riseNotification({
          color: 'success',
          data: 'Neuwagen eingelagert verkauft'
        }));
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
          this.carSellForm.patchValue({ client: res.data.id });
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

  public generatePdf(type: ExportType) {
    this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
      type: type,
      id: <string>this.car_data?.id
    }).subscribe(res => {
      const name: string = type === ExportType.net_export ? `Rechnung` : `Verkaufsrechnung`
      saveAs(new Blob([res], { type: 'application/pdf' }),
        `${ name } no.${ this.carSellForm.controls['invoice_number'].value } (${ moment().format('MM.DD.YYYY') }).pdf`);
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
  }

  private updateCosts = () => {
    const value: number = this.carSellForm.get('gross_sell')!.value;
    this.carSellForm.patchValue({
      net_sell: value * this.factorNet,
      iva_sell: value * this.factorIva
    });
    this.carSellForm.updateValueAndValidity();
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
