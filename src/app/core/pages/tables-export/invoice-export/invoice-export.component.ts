import { Component, OnInit } from '@angular/core';
import { ApiHelperService, RequestService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterDeepOption, Invoice, User } from '@core/interfaces';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FilterOperator } from '@core/interfaces/query-params';
import { Logo } from '@core/interfaces/logo';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-invoice-export',
  templateUrl: './invoice-export.component.html',
  styleUrls: ['./invoice-export.component.scss']
})
export class InvoiceExportComponent implements OnInit {

  public currentUrl: string;
  public year: number;
  public month: string;
  public invoice: Invoice | undefined;
  public logo: Logo | undefined;
  public user: User | undefined;
  private showLogo: boolean = false;
  private readonly jwt: string;
  private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  private beginDate: string = this.baseDate + '01';
  private invoiceId: number | undefined;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {
    this.year = moment(this.beginDate).year();
    this.month = environment.months[moment(this.beginDate).month()];
    this.currentUrl = `${ window.location.hostname }/export/invoice`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    this.loadQueryParams();
    this.loadData();
    this.loadUserdata();
  }




  get imgPath(): string {
    if (this.showLogo)
      return `${ this.apiHelperService.hostUrl }${ this.logo?.attributes.logo.data.attributes.url }`;
    else return `assets/brand_logo/Dealersoft.de-black.svg`;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('invoiceId')) this.invoiceId = +<number><unknown>map.get('invoiceId');
    });
  }

  public totalAmount = () => {
    return _.sum(this.invoice?.attributes.places.map(elm => elm.unit_price * elm.quantity));
  }

  private loadQueryParams = () => {
    if (this.activatedRoute.snapshot.queryParamMap.has('invoiceId')) {
      this.invoiceId = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('invoiceId');
    }
  }

  private loadData = () => {
    this.httpClient.get<any>(`${ this.apiHelperService.invoicesURL }/${ this.invoiceId }`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` }),
      params: this.query()
    }).subscribe(res => {
      this.invoice = res.data;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { invoiceId: this.invoiceId },
        queryParamsHandling: 'merge',
      });
    });
  }

  private loadUserdata = () => {
    this.httpClient.get<any>(`${ this.apiHelperService.usersURL }/me`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    }).subscribe(res => {
      this.user = res;
      this.httpClient.get<any>(this.apiHelperService.logosURL, {
        headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` }),
        params: this.queryLogo(res.id)
      }).subscribe(logos => {
        this.logo = logos.data[0];
        if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
      });
    });
  }

  private query = () => this.requestService.generateQuery({ populate: ['client'] });

  private queryLogo = (id: number) => this.requestService.generateQuery({
    populate: ['logo'],
    filters: [
      {
        field: '[user][id]',
        value: id,
        operator: FilterOperator.$eq,
        option: FilterDeepOption.$and
      }
    ]
  });
}
