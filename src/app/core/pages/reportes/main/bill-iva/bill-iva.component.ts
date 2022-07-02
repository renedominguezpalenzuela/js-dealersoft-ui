import { Component, OnInit } from '@angular/core';

import { CarBuy, CarSell } from '@core/interfaces';
import * as moment from 'moment';
import { ApiHelperService, RequestService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

import {  FilterDeepOption } from '@core/interfaces';
import { FilterOperator } from '@core/interfaces/query-params';

@Component({
  selector: 'app-bill-iva',
  templateUrl: './bill-iva.component.html',
  styleUrls: ['./bill-iva.component.scss']
})
export class BillIvaComponent implements OnInit {

  public dataBuy: CarBuy[] = [];
  public dataSell: CarSell[] = [];
  public currentDate: string;
  public currentUrl: string;
  public currentPage: number = 1;
  public id: number = 1;
  public pageCount: number = 100;
  public year: number;
  public month: string;
  public bill_info: any;
  public car_buy_data: any;
  public logo: any;
  public me: any;

  //Datos
  public invoice_number: any;
  public invoice_date: any;
  public user_city: any;


  private readonly jwt: string;
  private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  private beginDate: string = this.baseDate + '01';
  private showLogo: boolean = false;


  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {
    this.month = environment.months[moment(this.beginDate).month()];
    this.year = moment(this.beginDate).year();
    this.currentDate = `${ this.month } ${ new Date().getDate() }, ${ this.year }`;

    this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    this.loadQueryParams();
    this.loadPaginatedData();

   
  }

 
  get imgPath(): string {
    if (this.showLogo)
      return `${ this.apiHelperService.hostUrl }${ this.logo?.attributes.logo.data.attributes.url }`;
    else return `assets/brand_logo/dealersoft_black.png`;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
      if (map.has('id')) this.id = +<number><unknown>map.get('id');
    });

  
  }

  public loadPaginatedData = () => {
    forkJoin([ 
      this.httpClient.get<any>(`${  this.apiHelperService.invoicesURL }/?id=${  this.id }`, 
      this.generateOptionsInvoice( this.id)),

      this.httpClient.get<any>(this.apiHelperService.logosURL, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),
    ]).subscribe(res => {

 
 


 
       this.logo = res[1].data.filter((item: any) => item.attributes.user.data.id === res[2].id)[0];
       if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
       this.me = res[2];

       
       this.bill_info = res[0].data[0];

       this.invoice_number =  this.bill_info.attributes.invoice_number;
       this.invoice_date = this.bill_info.attributes.date;
       this.user_city = this.bill_info.attributes.owner.data.attributes.city

    });
  }

  private generateOptions = () => {
    return {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    }
  }


  //Obteniendo el id recibido desde el cliente
  private loadQueryParams = () => {
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
      this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');
  }

  private query = () => this.requestService.generateQuery({
    populate: ['owner', 'client', 'car', 'user', 'logo']
  });

  private generateOptionsInvoice = (id: any) => {
    return {
      params: this.queryInvoice(id),
      // headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
   
    }
  }

  private queryInvoice = (id: any) => this.requestService.generateQuery({
    populate: ['*'],
    filters: [
      {
        field: '[id]',
        operator: FilterOperator.$eq,
        value: id,
        option: FilterDeepOption.$and,
      },
    ],
  });


}