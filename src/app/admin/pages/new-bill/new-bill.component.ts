import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiHelperService, NotificationService, RequestService, ValidationsService, AuthService } from '@core/services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Customer, FilterDeepOption, Invoice } from '@core/interfaces';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { FilterOperator } from '@core/interfaces/query-params';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit, AfterViewInit, OnChanges {

  public newInvoiceForm = this.formBuilder.group({
    invoice_number: [null, [Validators.required]],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    date: [null, [Validators.required]],
    delivery_date: [null, [Validators.required]],
    client: [null, [Validators.required]],
    a25: [true, [Validators.required]],
    iva: [false, [Validators.required]],
    places: this.formBuilder.array([], [Validators.required, Validators.minLength(1)])
  });

  public clientsOptions: Customer[] = [];
  public filteredOptions: Customer[] = [];  //lista de clientes del Usuario


  @Input() public invoice_data: Invoice | undefined;


  private currentUserId: number | undefined;
  private invoice_id: number | undefined;

  @ViewChild('autoComplete') private autoComplete: ElementRef<HTMLInputElement> | undefined;

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
  ) {
  }

  get articles(): FormArray {
    return this.newInvoiceForm.controls['places'] as FormArray;
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(
      (user) => (this.currentUserId = user?.id)
    );

    //Pidiendo datos del invoice recibido como parametro
    this.activatedRoute.params.subscribe((params: Params) => {

      console.log(params)
      this.requestService
        .Get(`${this.apiHelperService.invoicesURL}/${params['id']}`)
        .subscribe((res) => {
          this.invoice_data = res.data.attributes;

          console.log(this.invoice_data)
          this.newInvoiceForm.patchValue({
            ...this.invoice_data
          })
          this.newInvoiceForm.updateValueAndValidity();
        })
    }

    );


    //OLD CODE:

    //Adicionando nuevo articulo
    this.addArticle();


    //Pidiendo lista de clientes
    this.requestService.Get(this.apiHelperService.clientsURL, this.queryClients(this.currentUserId))
      .subscribe(res => this.filteredOptions = this.clientsOptions = res.data);

    this.newInvoiceForm.get('iva')!.valueChanges.subscribe((change: boolean) => {
      this.newInvoiceForm.patchValue({ a25: !change }, { emitEvent: false, onlySelf: true });
    });

    this.newInvoiceForm.get('a25')!.valueChanges.subscribe((change: boolean) => {
      this.newInvoiceForm.patchValue({ iva: !change }, { emitEvent: false, onlySelf: true });
    });
  }

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.newInvoiceForm, input);
  };

  public submit() {
    if (this.newInvoiceForm.valid) {
      this.requestService.Post(this.apiHelperService.invoicesURL, this.newInvoiceForm.value)
        .subscribe(() => {
          this.notificationService.riseNotification({ color: 'success', data: 'Neue Rechnung gespeichert' });
          this.router.navigate(['/admin/list-invoices']);
        });
    }
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
    this.matDialog.open(CustomerFormComponent, {
      width: '650px',
      height: '530px'
    }).afterClosed().subscribe((out: boolean | { body: any }) => {
      if (typeof out !== 'boolean' && typeof out !== 'undefined') {
        const subscription = (res: any) => {
          this.notificationService.riseNotification({ color: 'success', data: 'Neukunde gespeichert' });
          this.clientsOptions.push(res.data);
          this.autoComplete!.nativeElement.value = `${res.data.attributes.first_name} ${res.data.attributes.last_name}`;
          this.newInvoiceForm.patchValue({ client: res.data.id });
        }
        this.requestService.Post(this.apiHelperService.clientsURL, out.body).subscribe(subscription);
      }
    });
  }

  public displayFn = (id: string): string => {
    if (this.filteredOptions.length > 0) {
      const customer: Customer = <Customer>this.filteredOptions.find(elm => elm.id === id);
      if (customer) return `${customer.attributes.first_name} ${customer.attributes.last_name}`;
      else return '';
    }
    return '';
  }


  //mostrando lista de clientes en combobox
  ngAfterViewInit(): void {
    this.ActualizarDatos(this.invoice_id)
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

  //Adicionando nuevo articulo
  public addArticle = () => {
    const articleForm = this.formBuilder.group({
      article: [null, Validators.required],
      quantity: [null, Validators.required],
      unit_price: [null, Validators.required],
    });

    this.articles.push(articleForm);
  }

  public deleteArticle = (index: number) => {
    this.articles.removeAt(index);
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




  private ActualizarDatos(invoice_id: any) {

    // this.requestService
    // .Get(
    //   this.apiHelperService.invoicesURL,
    //   this.requestService.generateQuery({
    //     // populate: ['car', 'client'],
    //     filters: [
    //       {
    //         field: '[id]',
    //         operator: FilterOperator.$eq,
    //         value: <string>invoice_id,
    //         option: FilterDeepOption.$and,
    //       },
    //     ],
    //   })
    // )
    // .subscribe((res) => {
    //   const data = res?.data[0]?.attributes;

    //   console.log(data)

    //   // this.newInvoiceForm.patchValue({
    //   //   ...data,
    //   //   car: this.car_data?.id,
    //   //   client: data?.client?.data?.id,
    //   // });

    //   // this.newInvoiceForm.patchValue({
    //   //   gross_buy: data?.gross_buy?.toFixed(this.total_decimales),
    //   //   net_buy: data?.net_buy?.toFixed(this.total_decimales),
    //   //   iva_buy: data?.iva_buy?.toFixed(this.total_decimales),
    //   // });

    //   this.newInvoiceForm.updateValueAndValidity();


    // });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("SSS")

    // if (changes?.['invoice_data'] && this.invoice_data) {

    //   this.requestService
    //     .Get(
    //       this.apiHelperService.invoicesURL,
    //       this.requestService.generateQuery({
    //         populate: ['car', 'client'],
    //         filters: [
    //           {
    //             field: '[car][id]',
    //             operator: FilterOperator.$eq,
    //             value: <string>this.invoice_data?.id,
    //             option: FilterDeepOption.$and,
    //           },
    //         ],
    //       })
    //     )
    //     .subscribe((res) => {
    //       const data = res?.data[0]?.attributes;

    //       console.log(data)

    //       // this.newInvoiceForm.patchValue({
    //       //   ...data,
    //       //   car: this.car_data?.id,
    //       //   client: data?.client?.data?.id,
    //       // });

    //       // this.newInvoiceForm.patchValue({
    //       //   gross_buy: data?.gross_buy?.toFixed(this.total_decimales),
    //       //   net_buy: data?.net_buy?.toFixed(this.total_decimales),
    //       //   iva_buy: data?.iva_buy?.toFixed(this.total_decimales),
    //       // });

    //       this.newInvoiceForm.updateValueAndValidity();


    //     });
    // }
  }
}
