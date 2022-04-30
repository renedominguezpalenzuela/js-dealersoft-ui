import { Component, OnInit } from '@angular/core';
import { Column, ColumnType } from '@core/lib/dynamic-table/utils/interfaces';
import { ApiHelperService, AuthService, LoadingService, RequestService } from '@core/services';
import { delay, forkJoin } from 'rxjs';
import * as moment from 'moment';
import { FilterDeepOption, FilterOperator } from '@core/interfaces/query-params';
import { ExportType } from '@core/services/request.service';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-vehicle-evaluation',
  templateUrl: './vehicle-evaluation.component.html',
  styleUrls: ['./vehicle-evaluation.component.scss']
})
export class VehicleEvaluationComponent implements OnInit {

  public chartData: { name: string, value: number }[] = [];
  public data: any[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.buy_date',
      header: 'Einkaufdatum',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.car.data.attributes.name',
      header: 'Fahrzeug',
      show: true,
      type: ColumnType.Regular
    },
    {
      column: 'attributes.net_buy',
      header: 'Einakuf Netto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'attributes.gross_buy',
      header: 'Einkauf Brutto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'attributes.a25',
      header: '§25a',
      show: true,
      type: ColumnType.Boolean
    },
    {
      column: 'attributes.iva',
      header: 'MwSt.',
      show: true,
      type: ColumnType.Boolean
    },
    {
      column: 'attributes.export',
      header: 'Export',
      show: true,
      type: ColumnType.Boolean
    },
    {
      column: 'attributes.invoice_date',
      header: 'Verkaufsdatum',
      show: true,
      type: ColumnType.Date
    },
    {
      column: 'attributes.net_sell',
      header: 'Verkauf Netto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'attributes.gross_sell',
      header: 'Verkauf Brutto',
      show: true,
      type: ColumnType.Currency
    },
    {
      column: 'net_profit',
      header: 'Netto Gewinn',
      show: true,
      type: ColumnType.Currency
    }
  ];
  public filterQuery: string = '';
  public loading: boolean = false;
  public year: number | undefined;
  public month: { label: string, value: string } = {
    label: moment().format('MMMM'),
    value: `${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }`
  };
  public months: { label: string, value: string }[] = environment.months.map((month, index) => ({
    label: month,
    value: index + 1 < 10 ? `0${ index + 1 }` : `${ index + 1 }`
  }));
  public years = Array.from({ length: 6 }, (v, i) => moment().year() - 6 + i + 1);
  public noShowLoader = true;
  public pageCount: number = 100;
  public currentPage: number = 1;
  public view: [number, number] = [280, 0];
  public showLegend: boolean = false;
  private sourcesOptions = environment.sourcesOptions;
  private currentUserId: number | undefined;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    this.authService.currentUser.subscribe(user => this.currentUserId = user?.id);
    this.noShowLoader = false;
    this.loadPaginatedData(this.currentPage);
  }

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => this.loading = loading);

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page')) this.currentPage = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');
    });

    this.breakPointsChanges();
  }

  public loadPaginatedData = ($event: number) => {
    this.currentPage = $event;
    forkJoin([
      this.requestService.Get(this.apiHelperService.carsBuyURL, this.query()),
      this.requestService.Get(this.apiHelperService.carsSellURL, this.query())
    ]).subscribe(res => {
      const dataBuy = res[0].data;
      const dataSell = res[1].data;
      const merged = _.merge(_.keyBy(dataBuy, 'attributes.car.data.id'), _.keyBy(dataSell, 'attributes.car.data.id'));
      const data = _.values(merged);
      this.data = data.map(elm => ({
        ...elm,
        net_profit: elm.attributes.net_sell - elm.attributes.net_buy,
        net_iva: elm.attributes.iva_sell - elm.attributes.iva_buy
      }));
      const chartDataGroupBy = _.groupBy(this.data, 'attributes.car.data.attributes.source');
      const keysChart = _.keys(chartDataGroupBy);
      this.chartData = keysChart.map((elm) => ({
        name: this.sourcesOptions.find(op => op.value === elm)?.label ?? 'Unknown',
        value: chartDataGroupBy[elm].length
      }));
      this.pageCount = res[0].meta.pagination.pageCount;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      });
      this.noShowLoader = true;
    });
  };

  public generatePdf() {
    this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
      type: ExportType.source,
      date: `${ this.year ?? moment().year() }-${ this.month.value }-01`
    }).subscribe(res => {
      saveAs(new Blob([res], { type: 'application/pdf' }),
        `report_${ ExportType.source } [${ this.month.label }, ${ this.year ?? moment().year() }] (${ moment().format('YYYY-MM-DD') }).pdf`);
    })
  }

  private breakPointsChanges = () => {
    this.breakpointObserver.observe('(max-width: 639px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLegend = false;
          this.view = [280, 0];
        }
      });
    this.breakpointObserver.observe('(min-width: 640px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLegend = false;
          this.view = [550, 0];
        }
      });
    this.breakpointObserver.observe('(min-width: 768px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLegend = false;
          this.view = [680, 0];
        }
      });
    this.breakpointObserver.observe('(min-width: 1024px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLegend = false;
          this.view = [620, 0];
        }
      });
    this.breakpointObserver.observe('(min-width: 1280px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLegend = true;
          this.view = [800, 0];
        }
      });
    this.breakpointObserver.observe('(min-width: 1536px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLegend = true;
          this.view = [1000, 0];
        }
      });
  };

  private query = () => this.requestService.generateQuery({
    'pagination[pageSize]': 10,
    'pagination[page]': this.currentPage,
    populate: ['car', 'car.owner'],
    filters: this.filters()
  });

  private filters = () => {
    let filters: any[] = [
      {
        field: '[car][owner][id]',
        value: <number>this.currentUserId,
        operator: FilterOperator.$eq,
        option: FilterDeepOption.$and
      }
    ];
    if (!!this.year && !!this.month)
      filters = [...filters, {
        field: 'createdAt', operator: FilterOperator.$gte,
        value: `${ this.year }-${ this.month?.value }-01`,
        option: FilterDeepOption.$and
      },
        {
          field: 'createdAt', operator: FilterOperator.$lte,
          value: `${ this.year }-${ this.month?.value }-${ moment(`${ this.year }-${ this.month?.value }-01`).daysInMonth() }`,
          option: FilterDeepOption.$and
        }
      ];
    return filters;
  }

}
