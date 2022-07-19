import { Component } from '@angular/core';
// import { CarBuy, CarSell } from '@core/interfaces';
// import * as moment from 'moment';
// import { ApiHelperService, RequestService } from '@core/services';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { forkJoin } from 'rxjs';
// import { environment } from '../../../../../../../environments/environment';

import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatosReportesService } from '../../../../../../servicios/datos-reportes.service';



@Component({
  selector: 'app-rechnung-iva',
  templateUrl: './rechnung-iva.component.html',
  styleUrls: ['./rechnung-iva.component.scss']
})
export class RechnungIvaComponent  {

  // public dataBuy: CarBuy[] = [];
  // public dataSell: CarSell[] = [];
  // public currentDate: string;
  // public currentUrl: string;
  // public currentPage: number = 1;
  // public id: number = 1;
  // public pageCount: number = 100;
  // public year: number;
  // public month: string;
  // public car_info: any;
  // public car_buy_data: any;
  // public logo: any;
  // public me: any;


  // private readonly jwt: string;
  // private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  // private beginDate: string = this.baseDate + '01';
  // private showLogo: boolean = false;

  public id: number = 1;
  public currentUrl: string;
  public readonly jwt: string;



  constructor(
    private readonly apiHelperService: ApiHelperService,
    //private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    //private readonly httpClient: HttpClient
    public readonly datosReportes: DatosReportesService
  ) {
  
    this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
    this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');

    this.datosReportes.loadPaginatedData(this.id, this.jwt, false);

   
  }

 
  
}
