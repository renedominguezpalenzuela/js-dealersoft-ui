import { Component, OnInit } from '@angular/core';
import { FilterDeepOption, FilterOperator } from '@core/interfaces/query-params';
import { Column, ColumnType } from '@core/lib/dynamic-table/utils/interfaces';
import { ApiHelperService, LoadingService, RequestService } from '@core/services';
import { ExportType } from '@core/services/request.service';
import * as saveAs from 'file-saver';
import * as _ from 'lodash';
import * as moment from 'moment';
import { delay, forkJoin } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-win-lose',
  templateUrl: './win-lose.component.html',
  styleUrls: ['./win-lose.component.scss']
})
export class WinLoseComponent implements OnInit {

  public data: any[] = [];
  public displayedColumns: Column[] = [
    {
      column: 'attributes.buy_date',
      header: 'Einkaufdatum',
      show: true,
      type: ColumnType.Date,
      ordenar: true
    },
    {
      column: 'attributes.car.data.attributes.name',
      header: 'Fahrzeug',
      show: true,
      type: ColumnType.Regular,
      ordenar: true
    },
    {
      column: 'attributes.net_buy',
      header: 'Einakuf Netto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.gross_buy',
      header: 'Einkauf Brutto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.a25',
      header: '§25a',
      show: true,
      type: ColumnType.Boolean,
      ordenar: true
    },
    {
      column: 'attributes.iva',
      header: 'MwSt.',
      show: true,
      type: ColumnType.Boolean,
      ordenar: true
    },
    {
      column: 'attributes.export',
      header: 'Export',
      show: true,
      type: ColumnType.Boolean,
      ordenar: true
    },
    {
      column: 'attributes.invoice_date',
      header: 'Verkaufsdatum',
      show: true,
      type: ColumnType.Date,
      ordenar: true
    },
    {
      column: 'attributes.net_sell',
      header: 'Verkauf Netto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.gross_sell',
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

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.currentPage = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    this.noShowLoader = false;
    this.loadPaginatedData(this.currentPage);
  }

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => this.loading = loading);

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page')) this.currentPage = <number><unknown>map.get('page');
    });
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
        net_profit: +elm.attributes.net_sell - +elm.attributes.net_buy,
        net_iva: +elm.attributes.iva_sell - +elm.attributes.iva_buy
      }));
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      });
      this.pageCount = res[0].meta.pagination.pageCount;
      this.noShowLoader = true;
    });
  };

  public sumNetProfit = () => _.sum(this.data.filter(elm => !_.isNaN(elm.net_profit)).map(data => data.net_profit));

  public sumNetIva = () => _.sum(this.data.filter(elm => !_.isNaN(elm.net_iva)).map(data => data.net_iva));

  public generatePdf() {
    const baseDate = `${ this.year ?? moment().year() }-${ this.month.value }`;
    this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
      type: ExportType.win_lose,
      page: this.currentPage,
      pageSize: 10,
      beginDate: `${ baseDate }-01`,
      endDate: `${ baseDate }-${ moment(baseDate, 'YYYY-MM').daysInMonth() }`
    }).subscribe(res => {
      saveAs(new Blob([res], { type: 'application/pdf' }),
        `report_${ ExportType.win_lose } [${ this.month.label }, ${ this.year ?? moment().year() }] (${ moment().format('YYYY-MM-DD') }).pdf`);
    })
  }

  private query = () => this.requestService.generateQuery({
    'pagination[pageSize]': 10,
    'pagination[page]': this.currentPage,
    populate: ['car'],
    filters: (!!this.year && !!this.month) ? this.filters() : []
  });

  private filters = () => [
    {
      field: 'createdAt',
      operator: FilterOperator.$gte,
      value: `${ this.year }-${ this.month?.value }-01`,
      option: FilterDeepOption.$and
    },
    {
      field: 'createdAt',
      operator: FilterOperator.$lte,
      value: `${ this.year }-${ this.month?.value }-${ moment(`${ this.year }-${ this.month?.value }-01`).daysInMonth() }`,
      option: FilterDeepOption.$and
    },
  ];

}
