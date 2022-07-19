import { Component } from '@angular/core';
//import { CarBuy, CarSell } from '@core/interfaces';
//import * as moment from 'moment';
import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { forkJoin } from 'rxjs';
//import { environment } from '../../../../../../../environments/environment';
import { DatosReportesService } from '../../../../../../servicios/datos-reportes.service';





@Component({
  selector: 'app-a25',
  templateUrl: './a25.component.html',
  styleUrls: ['./a25.component.scss']
})
export class A25Component  {

  //public dataBuy: CarBuy[] = [];
  //public dataSell: CarSell[] = [];
  //public currentDate: string;
  public currentUrl: string;
  //public currentPage: number = 1;
  public id: number = 1;
 // public pageCount: number = 100;
  //public year: number;
 // public month: string;
 // public car_info: any;
 // public car_buy_data: any;
 // public logo: any;
 // public me: any;


  private readonly jwt: string;
  //private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  //private beginDate: string = this.baseDate + '01';
  //private showLogo: boolean = false;
  //public image_url: any;


  constructor(
    private readonly apiHelperService: ApiHelperService,    
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,   
    public readonly datosReportes: DatosReportesService 
  ) {
  
    this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
  
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
    this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');


    this.datosReportes.loadPaginatedData(this.id, this.jwt, false);

   
  }

 
}
