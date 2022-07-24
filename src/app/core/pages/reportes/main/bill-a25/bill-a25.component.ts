// import { Component, OnInit } from '@angular/core';


// import { CarBuy, CarSell } from '@core/interfaces';
// import * as moment from 'moment';
// import { ApiHelperService, RequestService } from '@core/services';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { forkJoin } from 'rxjs';
// import { environment } from '../../../../../../environments/environment';

// import {  FilterDeepOption } from '@core/interfaces';
// import { FilterOperator } from '@core/interfaces/query-params';

import { Component } from '@angular/core';
import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatosReportesService } from '../../../../../servicios/datos-reportes.service';
//import { DatosReportesService } from '../../../../../../servicios/datos-reportes.service';





@Component({
  selector: 'app-bill-a25',
  templateUrl: './bill-a25.component.html',
  styleUrls: ['./bill-a25.component.scss']
})
export class BillA25Component {

  // public dataBuy: CarBuy[] = [];
  // public dataSell: CarSell[] = [];
  // public currentDate: string;
  // public currentUrl: string;
  // public currentPage: number = 1;
  // public id: number = 1;
  // public pageCount: number = 100;
  // public year: number;
  // public month: string;
  // public bill_info: any;
  // public car_buy_data: any;
  // public logo: any;
  // public me: any;

  // //Datos
  // public invoice_number: any;
  // public invoice_date: any;
  // public user_city: any;


  // private readonly jwt: string;
  // private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  // private beginDate: string = this.baseDate + '01';
  // private showLogo: boolean = false;

  public id: number = 1;
  public currentUrl: string;
  public readonly jwt: string;


  constructor(
    private readonly apiHelperService: ApiHelperService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    public readonly datosReportes: DatosReportesService
  ) {
    // this.month = environment.months[moment(this.beginDate).month()];
    // this.year = moment(this.beginDate).year();
    // this.currentDate = `${ this.month } ${ new Date().getDate() }, ${ this.year }`;

    // this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    // this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    // this.loadQueryParams();
    // this.loadPaginatedData();

    this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
    this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');

    this.datosReportes.loadPaginatedDataInvoices(this.id, this.jwt);

    


   
  }

 



}
