import { Component, OnInit } from '@angular/core';
import { Car, FilterDeepOption } from '@core/interfaces';
import { Column, ColumnType, OperationEvent, OptionSettings } from '@core/lib/dynamic-table/utils/interfaces';
import { ApiHelperService, AuthService, LoadingService, NotificationService, RequestService } from '@core/services';
import { delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SelectColumnsComponent } from '@core/components/select-columns/select-columns.component';
import { FilterOperator } from '@core/interfaces/query-params';
import { VehicleInfoComponent } from '@core/components/vehicle-info/vehicle-info.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RemoveConfirmationComponent } from '@core/components/remove-confirmation/remove-confirmation.component';
import { DynamicTableService } from '@core/lib/dynamic-table/dynamic-table.service';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.scss']
})
export class AllVehiclesComponent implements OnInit {

  public data: Car[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.name',
      header: 'Fahrzeugname',
      show: true,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.car_identifier',
      header: 'Kennung',
      show: true,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.selled',
      header: 'Status',
      show: true,
      type: ColumnType.SellStatus,
      ordenar: true
    },
    {
      column: 'attributes.first_register_date',
      header: 'Erstregistrierung',
      show: true,
      type: ColumnType.Date,
      ordenar: true
    },
    {
      column: 'attributes.last_owner',
      header: 'Letzter Besitzer',
      show: true,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.kilometres',
      header: 'Kilometer',
      show: true,
      type: ColumnType.Extra,
      prop: 'Km',
      ordenar: true
    },
    {
      column: 'attributes.kilowatt',
      header: 'Kilowatt',
      show: true,
      type: ColumnType.Extra,
      prop: 'Kw',
      ordenar: true
    },
    {
      column: 'attributes.build_variant',
      header: 'Variante',
      show: true,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.hsn',
      header: 'HSN',
      show: false,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.color',
      header: 'Farbe',
      show: false,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.tsn',
      header: 'TSN',
      show: false,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.comments',
      header: 'Bemerkungen',
      show: false,
      type: ColumnType.Bullets,
      ordenar: true
    },
    {
      column: 'attributes.buy.buy_date',
      header: 'Einkaufdatum',
      show: true,
      type: ColumnType.Date,
      ordenar: true
    },
    {
      column: 'attributes.buy.net_buy',
      header: 'Einakuf Netto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.buy.gross_buy',
      header: 'Einkauf Brutto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.sell.invoice_date',
      header: 'Verkaufsdatum',
      show: true,
      type: ColumnType.Date,
      ordenar: true
    },
    {
      column: 'attributes.sell.net_sell',
      header: 'Verkauf Netto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.sell.gross_sell',
      header: 'Verkauf Brutto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'net_profit',
      header: 'Netto Gewinn',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    }
  ];
  public OptionSettings: OptionSettings = {
    options: [
      {
        icon: 'info',
        literal: 'Detail anzeigen',
        event: 'Detail'
      },
      {
        icon: 'edit',
        literal: 'Bearbeiten',
        event: 'Edit'
      },
      {
        icon: 'shopping_cart',
        literal: 'kaufen Verkaufen',
        event: 'Buy_Sell'
      },
      {
        icon: 'delete',
        literal: 'Löschen',
        event: 'Remove'
      }
    ]
  };
  public filterQuery: string = '';
  public loading: boolean = false;
  public selectedValues: string[] = [];
  public loadSelled: boolean = true;
  public noShowLoader = true;
  public pageCount: number = 100;
  public currentPage: number = 1;
  public extraOption: { event: string, icon: string } = { event: 'TO_DETAIL', icon: 'chevron_right' };
  private currentUserId: number | undefined;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly dynamicTableService: DynamicTableService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    this.authService.currentUser.subscribe(user => this.currentUserId = user?.id);
    this.noShowLoader = false;
    this.loadPaginatedData(this.currentPage);
  }

  public ngOnInit(): void {
    if (this.dynamicTableService.hasUrl(this.router.url))
      this.displayedColumns = <Column[]>this.dynamicTableService.getData(this.router.url);
    else this.dynamicTableService.setUrl(this.router.url, this.displayedColumns);

    this.selectedValues = this.displayedColumns.filter(col => col.show).map(col => col.column);
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => this.loading = loading);

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page'))
        this.currentPage = <number><unknown>map.get('page');
    });
  }

  public openSelectColumnDialog() {
    this.matDialog.open(SelectColumnsComponent, {
      width: '450px',
      height: '440px',
      data: { columns: this.displayedColumns }
    }).afterClosed().subscribe((out: false | { columns: Column[] }) => {
      if (out) {
        this.displayedColumns = JSON.parse(JSON.stringify(out.columns));
        this.dynamicTableService.setUrl(this.router.url, this.displayedColumns);
      }
    });
  }

  public toggleData = () => this.loadPaginatedData(this.currentPage);

  public catchEvent($event: OperationEvent) {
    switch ($event.type) {
      case 'Detail':
        this.requestService.Get(`${ this.apiHelperService.carsURL }/${ $event.value.id }`).subscribe(res => {
          this.matDialog.open(VehicleInfoComponent, {
            width: '580px',
            height: '480px',
            data: <Car>res.data,
            backdropClass: 'modal-backdrop'
          });
        });
        break;
      case 'Edit':
        this.router.navigate(['/admin/vehicle-form', $event.value.id], { queryParams: { tab: 1 } });
        break;
      case 'Buy_Sell':
        this.router.navigate(['/admin/vehicle-form', $event.value.id], { queryParams: { tab: 2 } });
        break;
      case 'Remove':
        this.matDialog.open(RemoveConfirmationComponent, {
          data: 'Möchten Sie das ausgewählte Fahrzeug wirklich löschen?',
          backdropClass: 'modal-backdrop'
        }).afterClosed().subscribe((out: boolean | undefined) => {
          if (out) {
            this.requestService.Delete(`${ this.apiHelperService.carsURL }/${ $event.value.id }`)
              .subscribe(() => {
                this.loadPaginatedData(this.currentPage);
                this.notificationService.riseNotification({ color: 'success', data: 'Fahrzeug erfolgreich entfernt' });
              });
          }
        });
        break;
      case 'TO_DETAIL':
        this.router.navigate(['/admin/vehicle-form', $event.value.id], { queryParams: { tab: 1 } });
        break;
      default:
        break;
    }
  }

  public loadPaginatedData = ($event: number) => {
    this.currentPage = $event;
    this.requestService.Get(this.apiHelperService.carsURL, this.query())
      .subscribe(res => {
        this.data = res.data2.map((elm: any) => ({
          ...elm,
          net_profit: elm.attributes.sell?.net_sell - elm.attributes.buy?.net_buy,
          net_iva: elm.attributes.sell?.iva_sell - elm.attributes.buy?.iva_buy
        }));
        this.pageCount = res.meta.pagination.pageCount;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: this.currentPage },
          queryParamsHandling: 'merge',
        });
        this.noShowLoader = true;
      });
  }

  private query = () => {
    if (this.loadSelled) {
      return this.requestService.generateQuery({
        'pagination[pageSize]': 10,
        'pagination[page]': this.currentPage,
        populate: ['owner'],
        filters: [
          {
            field: '[owner][id]',
            value: <number>this.currentUserId,
            operator: FilterOperator.$eq,
            option: FilterDeepOption.$and
          }
        ]
      });
    } else {
      return this.requestService.generateQuery({
        'pagination[pageSize]': 10,
        'pagination[page]': this.currentPage,
        populate: ['owner'],
        filters: [
          {
            field: '[owner][id]',
            value: <number>this.currentUserId,
            operator: FilterOperator.$eq,
            option: FilterDeepOption.$and
          },
          { field: 'selled', operator: FilterOperator.$eq, value: false, option: FilterDeepOption.$and }
        ]
      });
    }
  }
}
