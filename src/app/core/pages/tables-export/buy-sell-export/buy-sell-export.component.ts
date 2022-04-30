import { Component, OnInit } from '@angular/core';
import { CarBuy, CarSell, FilterDeepOption, FilterOption } from '@core/interfaces';
import * as moment from 'moment';
import { ApiHelperService, RequestService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterOperator } from '@core/interfaces/query-params';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-buy-sell-export',
  templateUrl: './buy-sell-export.component.html',
  styleUrls: ['./buy-sell-export.component.scss']
})
export class BuySellExportComponent implements OnInit {

  public dataBuy: CarBuy[] = [];
  public dataSell: CarSell[] = [];
  public currentDate: Date = new Date();
  public currentUrl: string;
  public currentPage: number = 1;
  public currentPageSize: number = 5;
  public pageCount: number = 100;
  public year: number;
  public month: string;
  private readonly jwt: string;
  private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  private beginDate: string = this.baseDate + '01';
  private endDate: string = this.baseDate + moment().daysInMonth();

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {
    this.year = moment(this.beginDate).year();
    this.month = environment.months[moment(this.beginDate).month()];
    this.currentUrl = `${ window.location.hostname }/export/buy-sell`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    this.loadQueryParams();
    this.loadPaginatedData();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('page')) this.currentPage = +<number><unknown>map.get('page');
      if (map.has('pageSize')) this.currentPageSize = +<number><unknown>map.get('pageSize');
      if (map.has('beginDate')) this.beginDate = <string>map.get('beginDate');
      if (map.has('endDate')) this.endDate = <string>map.get('endDate');
    });
  }

  public loadPaginatedData = () => {
    forkJoin([
      this.httpClient.get<any>(this.apiHelperService.carsBuyURL, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.carsSellURL, this.generateOptions()),
    ]).subscribe(res => {
      this.dataBuy = res[0].data;
      this.dataSell = res[1].data;
      this.pageCount = res[0].meta.pagination.pageCount;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          page: this.currentPage,
          pageSize: this.currentPageSize,
          beginDate: this.beginDate,
          endDate: this.endDate
        },
        queryParamsHandling: 'merge',
      });
    });
  }

  public sumNetBuy = () => _.sum(this.dataBuy.map(buy => buy.attributes.net_buy));

  public sumNetSell = () => _.sum(this.dataSell.map(buy => buy.attributes.net_sell));

  public sumIvaBuy = () => _.sum(this.dataBuy.map(buy => buy.attributes.iva_buy));

  public sumIvaSell = () => _.sum(this.dataSell.map(buy => buy.attributes.iva_sell));

  private generateOptions = () => {
    return {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    }
  }

  private loadQueryParams = () => {
    if (this.activatedRoute.snapshot.queryParamMap.has('page'))
      this.currentPage = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('page');

    if (this.activatedRoute.snapshot.queryParamMap.has('pageSize'))
      this.currentPageSize = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('pageSize');

    if (this.activatedRoute.snapshot.queryParamMap.has('beginDate'))
      this.beginDate = <string>this.activatedRoute.snapshot.queryParamMap.get('beginDate');

    if (this.activatedRoute.snapshot.queryParamMap.has('endDate'))
      this.endDate = <string>this.activatedRoute.snapshot.queryParamMap.get('endDate');
  }

  private query = () => this.requestService.generateQuery({
    'pagination[pageSize]': this.currentPageSize,
    'pagination[page]': this.currentPage,
    populate: ['car'],
    filters: this.filters()
  });

  private filters = (): FilterOption[] => [
    {
      field: 'createdAt', operator: FilterOperator.$gte,
      value: this.beginDate, option: FilterDeepOption.$and
    },
    {
      field: 'createdAt', operator: FilterOperator.$lte,
      value: this.endDate, option: FilterDeepOption.$and
    }
  ];

}
