import { Component, OnInit } from '@angular/core';
import { ApiHelperService, LoadingService, RequestService } from '@core/services';
import { delay, forkJoin } from 'rxjs';
import { FilterDeepOption, FilterOperator } from '@core/interfaces/query-params';
import * as moment from 'moment';
import { CarBuy, CarSell } from '@core/interfaces';
import { Column, ColumnType } from '@core/lib/dynamic-table/utils/interfaces';
import * as _ from 'lodash';
import { saveAs } from 'file-saver';
import { ExportType } from '@core/services/request.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-buying-selling',
  templateUrl: './buying-selling.component.html',
  styleUrls: ['./buying-selling.component.scss']
})
export class BuyingSellingComponent implements OnInit {

  public loading: boolean = false;
  public displayedColumnsBuy: Column[] = [
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
      column: 'attributes.net_buy',
      header: 'Einakuf Netto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.iva_buy',
      header: 'EK MwSt.',
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
    }
  ];
  public displayedColumnsSell: Column[] = [
    {
      column: 'attributes.invoice_date',
      header: 'Datum',
      show: true,
      type: ColumnType.Date,
      ordenar: true
    },
    {
      column: 'attributes.car.data.attributes.name',
      header: 'Wagen',
      show: true,
      type: ColumnType.Regular,
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
      column: 'attributes.net_sell',
      header: 'Verkauf Netto',
      show: true,
      type: ColumnType.Currency,
      ordenar: true
    },
    {
      column: 'attributes.iva_sell',
      header: 'Verkauf MwSt.',
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
    }
  ];
  public pageCountBuy: number = 100;
  public pageSizeBuy: number = 5;
  public currentPageBuy: number = 1;
  public pageCountSell: number = 100;
  public pageSizeSell: number = 5;
  public currentPageSell: number = 1;
  public dataBuy: CarBuy[] = [];
  public dataSell: CarSell[] = [];
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

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.noShowLoader = false;
    if (this.activatedRoute.snapshot.queryParamMap.has('pageBuy')) {
      this.currentPageBuy = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('pageBuy');
    }
    if (this.activatedRoute.snapshot.queryParamMap.has('pageSell')) {
      this.currentPageSell = <number><unknown>this.activatedRoute.snapshot.queryParamMap.get('pageSell');
    }
    this.loadPaginatedData(this.currentPageBuy, this.currentPageSell);
  }

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => this.loading = loading);

    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('pageBuy'))
        this.currentPageBuy = <number><unknown>map.get('pageBuy');
      if (map.has('pageSell'))
        this.currentPageSell = <number><unknown>map.get('pageSell');
    });
  }

  public loadPaginatedData = ($eventBuy: number, $eventSell: number) => {
    this.currentPageBuy = $eventBuy;
    this.currentPageSell = $eventSell;
    forkJoin([
      this.requestService.Get(this.apiHelperService.carsBuyURL, this.queryBuy()),
      this.requestService.Get(this.apiHelperService.carsSellURL, this.querySell())
    ]).subscribe(res => {
      this.dataBuy = res[0].data;
      this.dataSell = res[1].data;
      this.pageCountBuy = res[0].meta.pagination.pageCount;
      this.pageCountSell = res[1].meta.pagination.pageCount;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { pageBuy: this.currentPageBuy, pageSell: this.currentPageSell },
        queryParamsHandling: 'merge',
      });
      this.noShowLoader = true
    });
  };

  public sumNetBuy = () =>
    _.sum(this.dataBuy.filter(elm => !_.isNaN(elm.attributes.net_buy)).map(buy => buy.attributes.net_buy));

  public sumNetSell = () =>
    _.sum(this.dataSell.filter(elm => !_.isNaN(elm.attributes.net_sell)).map(buy => buy.attributes.net_sell));

  public sumIvaBuy = () =>
    _.sum(this.dataBuy.filter(elm => !_.isNaN(elm.attributes.iva_buy)).map(buy => buy.attributes.iva_buy));

  public sumIvaSell = () =>
    _.sum(this.dataSell.filter(elm => !_.isNaN(elm.attributes.iva_sell)).map(buy => buy.attributes.iva_sell));

  public generatePdf() {
    const baseDate = `${ this.year ?? moment().year() }-${ this.month.value }`;
    this.requestService.downloadPDF(this.apiHelperService.pdfURL, {
      type: ExportType.buy_sell,
      page: this.currentPageBuy,
      pageSize: 10,
      beginDate: `${ baseDate }-01`,
      endDate: `${ baseDate }-${ moment(baseDate, 'YYYY-MM').daysInMonth() }`
    }).subscribe(res => {
      saveAs(new Blob([res], { type: 'application/pdf' }),
        `report_${ ExportType.buy_sell } [${ this.month.label }, ${ this.year ?? moment().year() }] (${ moment().format('YYYY-MM-DD') }).pdf`);
    })
  }

  private queryBuy = () => this.requestService.generateQuery({
    'pagination[pageSize]': 10,
    'pagination[page]': this.currentPageBuy,
    populate: ['car'],
    filters: (!!this.year && !!this.month) ? this.filters() : []
  });

  private querySell = () => this.requestService.generateQuery({
    'pagination[pageSize]': 10,
    'pagination[page]': this.currentPageSell,
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
