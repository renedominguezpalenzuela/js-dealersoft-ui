import { Component } from '@angular/core';


// import { CarBuy, CarSell } from '@core/interfaces';
//import * as moment from 'moment';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { forkJoin } from 'rxjs';
//import { Globals } from '../../../../../globales';
//import { environment } from '../../../../../../environments/environment';

import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatosReportesService } from '../../../../../servicios/datos-reportes.service';

@Component({
  selector: 'app-buy-car-a25',
  templateUrl: './buy-car-a25.component.html',
  styleUrls: ['./buy-car-a25.component.scss'],
  //providers: [Globals]
})
export class BuyCarA25Component  {



  //public dataBuy: CarBuy[] = [];
 // public dataSell: CarSell[] = [];
  //public currentDate: string;
  
  //public year: number;
  //public month: string;
  // public car_info: any;
  // public car_buy_data: any;
  // public logo: any;
  // public me: any;
  // public image_url: any;
  
  public currentPage: number = 1;
  public pageCount: number = 100;
  public id: number = 1;
  public currentUrl: string;
  public readonly jwt: string;
  


  
  //private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  //private beginDate: string = this.baseDate + '01';
  //private showLogo: boolean = false;

  constructor(
    private readonly apiHelperService: ApiHelperService,
    // private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    // private readonly httpClient: HttpClient,
    //private readonly globales: Globals,
    public readonly datosReportes: DatosReportesService
  ) {
  //  this.month = environment.months[moment(this.beginDate).month()];
  //  this.year = moment(this.beginDate).year();
  //  this.currentDate = `${ this.month } ${ new Date().getDate() }, ${ this.year }`;
   
    this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');

  
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
    this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');

    //this.loadQueryParams();
    
    this.datosReportes.loadPaginatedData(this.id, this.jwt, true);  
  }

 

  // ngOnInit(): void {

  //   // this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
  //   //   if (map.has('id')) this.id = +<number><unknown>map.get('id');
  //   // });

  
  // }



  // public loadPaginatedData = () => {
  //   forkJoin([
  //     this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),           
  //     this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/${ this.id }`)      
  //   ]).subscribe((res:any) => {
  //    this.me = res[0];
  //    let user_id = this.me.id;
  //    this.car_info = res[1];    
  //    this.car_buy_data = this.car_info.data.attributes.buy;     
  //    this.httpClient.get<any>(`${this.apiHelperService.logosURL}?filters[user][id][$eq]=${user_id}&populate=logo`).subscribe(
  //     (dato)=>{
  //       this.image_url=dato?.data[0].attributes.logo.data.attributes.url;                       
  //       if (this.image_url)   this.showLogo = true;        
  //     }
  //    )
  //   });
  // }


  // public loadPaginatedData_OLD = () => {
  //   forkJoin([
  //     this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),
  //    // this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/?id=${ this.id }`, this.generateOptions()),
  //    this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/${ this.id }`, this.generateOptions()),
  //     this.httpClient.get<any>(this.apiHelperService.carsBuyURL, this.generateOptions()),
  //     this.httpClient.get<any>(this.apiHelperService.logosURL, this.generateOptions()),
      
  //   ]).subscribe((res:any) => {
  //     this.me = res[0];
  //     //this.car_info = res[1].data2.filter((item: any) => item.id === this.id)[1];
  //     this.car_info = res[1].data;
     
  //     this.car_buy_data = res[2].data.filter((item: any) => item.attributes.car.data.id === this.id)[1];


  //     this.logo = res[3].data.filter((item: any) => item.attributes.user.data.id === res[0].id)[1];
  //     if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
  //   });
  // }




  // private generateOptions = () => {
  //   return {
  //     params: this.query(),
  //     headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
  //   }
  // }

  // private loadQueryParams = () => {
  //   if (this.activatedRoute.snapshot.queryParamMap.has('id'))
  //     this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');
  // }

  // private query = () => this.requestService.generateQuery({
  //   populate: ['owner', 'client', 'car', 'user', 'logo']
  // });


}
