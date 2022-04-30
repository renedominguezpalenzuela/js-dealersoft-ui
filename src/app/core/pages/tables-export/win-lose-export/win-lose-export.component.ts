import { Component, OnInit } from '@angular/core';
import { FilterDeepOption, FilterOption } from '@core/interfaces';
import * as moment from 'moment';
import { ApiHelperService, RequestService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import { FilterOperator } from '@core/interfaces/query-params';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-win-lose-export',
  templateUrl: './win-lose-export.component.html',
  styleUrls: ['./win-lose-export.component.scss']
})
export class WinLoseExportComponent implements OnInit {

  public data: any[] = [];
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

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {
    this.month = environment.months[moment(this.beginDate).month()];
    this.year = moment(this.beginDate).year();
    this.currentUrl = `${ window.location.hostname }/export/win-lose`;
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
      this.httpClient.get<any>(this.apiHelperService.carsBuyURL, {
        params: this.query(),
        headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
      }),
      this.httpClient.get<any>(this.apiHelperService.carsSellURL, {
        params: this.query(),
        headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
      })
    ]).subscribe(res => {
      const dataBuy = res[0].data;
      const dataSell = res[1].data;
      const merged = _.merge(_.keyBy(dataBuy, 'attributes.car.data.id'), _.keyBy(dataSell, 'attributes.car.data.id'));
      const data = _.values(merged);
      this.data = data.map(elm => ({
        ...elm,
        net_profit: elm.attributes.net_buy - elm.attributes.net_sell,
        net_iva: elm.attributes.iva_buy - elm.attributes.iva_sell
      }));
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
      this.pageCount = res[0].meta.pagination.pageCount;
    });
  }

  public sumNetProfit = () => _.sum(this.data.map(data => data.net_profit));

  public sumNetIva = () => _.sum(this.data.map(data => data.net_iva));

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
