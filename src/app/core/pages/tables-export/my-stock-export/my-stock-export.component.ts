import { Component, OnInit } from '@angular/core';
import { ApiHelperService, RequestService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FilterDeepOption, FilterOperator, FilterOption } from '@core/interfaces/query-params';
import { Car } from '@core/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-stock-export',
  templateUrl: './my-stock-export.component.html',
  styleUrls: ['./my-stock-export.component.scss']
})
export class MyStockExportComponent implements OnInit {

  public data: Car[] = [];
  public currentDate: Date = new Date();
  public currentUrl: string;
  public currentPage: number = 1;
  public currentPageSize: number = 10;
  public pageCount: number = 100;
  public year: number;
  public month: string;
  private readonly jwt: string;
  private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  private beginDate: string = this.baseDate + '01';
  private endDate: string = this.baseDate + moment().daysInMonth();
  private userId: string | undefined;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {
    this.month = environment.months[moment(this.beginDate).month()];
    this.year = moment(this.beginDate).year();
    this.currentUrl = `${ window.location.hostname }/export/my-stock`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    this.loadQueryParams();
    this.loadUserdata();
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
    this.httpClient.get<any>(this.apiHelperService.carsURL, {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    }).subscribe(res => {
      this.data = res.data2;
      this.pageCount = res.meta.pagination.pageCount;
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

  public sumNetTotal = () => _.sum(this.filterNOtNull().map(elm => elm.attributes.car_buy_data.data.attributes.net_buy));

  public sumIvaTotal = () => _.sum(this.filterNOtNull().map(elm => elm.attributes.car_buy_data.data.attributes.iva_buy));

  public suma25Total = () => _.sum(this.filterNOtNull().map(elm => elm.attributes.car_buy_data.data.attributes.net_buy));

  public sumTotal = () => _.sum(this.filterNOtNull().map(elm => elm.attributes.car_buy_data.data.attributes.net_buy));

  private filterNOtNull = () => this.data.filter(elm => elm.attributes.car_buy_data.data !== null);

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
    filters: this.filters(),
    populate: ['car_buy_data', 'owner']
  });

  private filters = (): FilterOption[] => [
    { field: 'selled', operator: FilterOperator.$eq, value: false, option: FilterDeepOption.$and },
    {
      field: 'createdAt', operator: FilterOperator.$gte,
      value: this.beginDate, option: FilterDeepOption.$and
    },
    {
      field: 'createdAt', operator: FilterOperator.$lte,
      value: this.endDate, option: FilterDeepOption.$and
    },
    {
      field: '[owner][id]',
      value: <string>this.userId,
      operator: FilterOperator.$eq,
      option: FilterDeepOption.$and
    }
  ];

  private loadUserdata = () => {
    this.httpClient.get<any>(`${ this.apiHelperService.usersURL }/me`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    }).subscribe(res => {
      this.userId = res.id;
      this.loadPaginatedData();
    });
  }

}
