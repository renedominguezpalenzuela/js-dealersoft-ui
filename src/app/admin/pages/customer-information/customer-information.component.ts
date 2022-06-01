import { Component, OnInit } from '@angular/core';
import { Customer, FilterDeepOption } from '@core/interfaces';
import { FilterOperator } from '@core/interfaces/query-params';
import {
  Column,
  ColumnType,
  OperationEvent,
  OptionSettings,
} from '@core/lib/dynamic-table/utils/interfaces';
import {
  ApiHelperService,
  LoadingService,
  NotificationService,
  RequestService,
  AuthService,
} from '@core/services';
import { delay } from 'rxjs';
import { SelectColumnsComponent } from '@core/components/select-columns/select-columns.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '@core/components/customer-form/customer-form.component';
import { CustomerInfoComponent } from '@core/components/customer-info/customer-info.component';
import * as _ from 'lodash';
import { RemoveConfirmationComponent } from '@core/components/remove-confirmation/remove-confirmation.component';
import { DynamicTableService } from '@core/lib/dynamic-table/dynamic-table.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '@core/interfaces';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss'],
})
export class CustomerInformationComponent implements OnInit {
  public authUser: User | null = null;
  public isAuth: boolean = false;

  public data: Customer[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.title',
      header: 'Titel',
      show: true,
      type: ColumnType.Regular,
    },
    {
      column: 'attributes.first_name',
      header: 'Vorname',
      show: true,
      type: ColumnType.Regular,
    },
    {
      column: 'attributes.last_name',
      header: 'Nachnames',
      show: true,
      type: ColumnType.Regular,
    },
    {
      column: 'attributes.email',
      header: 'Email',
      show: true,
      type: ColumnType.MailTo,
    },
    {
      column: 'attributes.phone',
      header: 'Telefon',
      show: true,
      type: ColumnType.CallTo,
    },
    {
      column: 'attributes.city',
      header: 'Stadt',
      show: true,
      type: ColumnType.Regular,
    },
    {
      column: 'attributes.country',
      header: 'Land',
      show: true,
      type: ColumnType.Regular,
    },
    {
      column: 'attributes.birth_date',
      header: 'Geburtsdatum',
      show: false,
      type: ColumnType.Date,
    },
    {
      column: 'attributes.fax',
      header: 'Fax',
      show: false,
      type: ColumnType.Regular,
    },
    {
      column: 'attributes.website',
      header: 'Webseite',
      show: false,
      type: ColumnType.ExternalLink,
    },
  ];
  public OptionSettings: OptionSettings = {
    options: [
      {
        icon: 'info',
        literal: 'Detail anzeigen',
        event: 'Detail',
      },
      {
        icon: 'edit',
        literal: 'Bearbeiten',
        event: 'Edit',
      },
      {
        icon: 'delete',
        literal: 'Löschen',
        event: 'Remove',
      },
    ],
  };
  public filterQuery: string = '';
  public loading: boolean = false;
  public noShowLoader = true;
  public pageCount: number = 100;
  public currentPage: number = 1;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly matDialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly dynamicTableService: DynamicTableService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number>(
        (<unknown>this.activatedRoute.snapshot.queryParamMap.get('page'))
      );
    }
    this.noShowLoader = false;
    // this.loadPaginatedData(this.currentPage);

   
  }

  ngOnInit(): void {

    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;
    });

    this.loadPaginatedData(this.currentPage);



    if (this.dynamicTableService.hasUrl(this.router.url))
      this.displayedColumns = <Column[]>(
        this.dynamicTableService.getData(this.router.url)
      );
    else
      this.dynamicTableService.setUrl(this.router.url, this.displayedColumns);

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
      .Get(this.apiHelperService.clientsURL, this.queryClients(this.authUser?.id))
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

  public openSelectColumnDialog() {
    this.matDialog
      .open(SelectColumnsComponent, {
        width: '450px',
        height: '440px',
        data: { columns: this.displayedColumns },
      })
      .afterClosed()
      .subscribe((out: false | { columns: Column[] }) => {
        if (out) {
          this.displayedColumns = JSON.parse(JSON.stringify(out.columns));
          this.dynamicTableService.setUrl(
            this.router.url,
            this.displayedColumns
          );
        }
      });
  }

  public openCustomerFormDialog() {
    const subscription = () => {
      this.notificationService.riseNotification({
        color: 'success',
        data: 'Neukunde gespeichert',
      });
      this.loadPaginatedData(this.currentPage);
    };
    this.matDialog
      .open(CustomerFormComponent, {
        width: '650px',
        height: '540px',
      })
      .afterClosed()
      .subscribe((out: boolean | { body: any }) => {
        if (typeof out !== 'boolean' && typeof out !== 'undefined')
          this.requestService
            .Post(this.apiHelperService.clientsURL, out.body)
            .subscribe(subscription);
      });
  }

  public catchEvent($event: OperationEvent) {
    switch ($event.type) {
      case 'Detail':
        this.matDialog.open(CustomerInfoComponent, {
          width: '580px',
          height: '440px',
          data: <Customer>$event.value,
          backdropClass: 'modal-backdrop',
        });
        break;
      case 'Edit':
        this.editCustomer($event.value);
        break;
      case 'Remove':
        this.removeCustomer($event.value);
        break;
      default:
        break;
    }
  }

  private notValue = (value: any) => _.isNil(value) || value === '';

  // private query = () => this.requestService.generateQuery({
  //   'pagination[pageSize]': 10,
  //   'pagination[page]': this.currentPage,
  //   populate: ['logo']
  // });

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
      'pagination[pageSize]': 10,
     'pagination[page]': this.currentPage
    });

  private editCustomer(customer: Customer) {
    const subscription = () => {
      this.notificationService.riseNotification({
        color: 'success',
        data: 'Kunde erfolgreich aktualisiert',
      });
      this.loadPaginatedData(this.currentPage);
    };
    this.matDialog
      .open(CustomerFormComponent, {
        width: '650px',
        height: '540px',
        data: customer,
        backdropClass: 'modal-backdrop',
      })
      .afterClosed()
      .subscribe((out: boolean | { body: any }) => {
        if (typeof out !== 'boolean' && typeof out !== 'undefined') {
          const value = _.omitBy(out.body, this.notValue);
          this.requestService
            .Put(`${this.apiHelperService.clientsURL}/${customer.id}`, value)
            .subscribe(subscription);
        }
      });
  }

  private removeCustomer(customer: Customer) {
    this.matDialog
      .open(RemoveConfirmationComponent, {
        data: 'Möchten Sie den ausgewählten Kunden wirklich löschen?',
        backdropClass: 'modal-backdrop',
      })
      .afterClosed()
      .subscribe((out: boolean | undefined) => {
        if (out) {
          this.requestService
            .Delete(`${this.apiHelperService.clientsURL}/${customer.id}`)
            .subscribe(() => {
              this.loadPaginatedData(this.currentPage);
              this.notificationService.riseNotification({
                color: 'success',
                data: 'Kunde erfolgreich entfernt',
              });
            });
        }
      });
  }
}
