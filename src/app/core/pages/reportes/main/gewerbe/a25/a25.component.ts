import { Component, OnInit } from '@angular/core';
import { CarBuy, CarSell } from '@core/interfaces';
import * as moment from 'moment';
import { ApiHelperService, RequestService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';





@Component({
  selector: 'app-a25',
  templateUrl: './a25.component.html',
  styleUrls: ['./a25.component.scss']
})
export class A25Component implements OnInit {

  public dataBuy: CarBuy[] = [];
  public dataSell: CarSell[] = [];
  public currentDate: string;
  public currentUrl: string;
  public currentPage: number = 1;
  public id: number = 1;
  public pageCount: number = 100;
  public year: number;
  public month: string;
  public car_info: any;
  public car_buy_data: any;
  public logo: any;
  public me: any;


  private readonly jwt: string;
  private readonly baseDate: string = `${ moment().year() }-${ moment().month() + 1 > 9 ? moment().month() + 1 : `0${ moment().month() + 1 }` }-`;
  private beginDate: string = this.baseDate + '01';
  private showLogo: boolean = false;
  public image_url: any;


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
    //this.loadQueryParams();

    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
    this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');


    this.loadPaginatedData();

   
  }

 
  get imgPath(): string {  
    if (this.showLogo) {
      if (this.image_url.substring(0,4)==='http') {
        return this.image_url
      } else {
        return `${ this.apiHelperService.hostUrl }${ this.image_url }`;
      }            
    }  
    else  {
      return `assets/brand_logo/dealersoft_black.png`;
    }
  }

  
  // get imgPath(): string {
  //   let img_url = this.logo?.attributes.logo.data.attributes.url;  
    
  //     if (this.showLogo) {
  //       if (img_url.substring(0,4)==='http') {
  //         return img_url
  //       } else {
  //         return `${ this.apiHelperService.hostUrl }${ img_url }`;
  //       }            
  //     }  
  //     else  {
  //       return `assets/brand_logo/dealersoft_black.png`;
  //     }
  //   }

  // get imgPath(): string {
  //   if (this.showLogo)
  //     return `${ this.apiHelperService.hostUrl }${ this.logo?.attributes.logo.data.attributes.url }`;
  //   else return `assets/brand_logo/dealersoft_black.png`;
  // }

  ngOnInit(): void {
    // this.activatedRoute.queryParamMap.subscribe((map: ParamMap) => {
    //   if (map.has('id')) this.id = +<number><unknown>map.get('id');
    // });

  
  }


  public loadPaginatedData = () => {
    forkJoin([
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),           
      this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/${ this.id }`)      
    ]).subscribe((res:any) => {
     this.me = res[0];
     let user_id = this.me.id;
     this.car_info = res[1];    
                         
     this.car_buy_data = this.car_info.data.attributes.sell;   

     this.httpClient.get<any>(`${this.apiHelperService.logosURL}?filters[user][id][$eq]=${user_id}&populate=logo`).subscribe(
      (dato)=>{
        this.image_url=dato?.data[0].attributes.logo.data.attributes.url;                       
        if (this.image_url)   this.showLogo = true;        
      }
     )
    });
  }



  public loadPaginatedData_OLD = () => {
    forkJoin([
      this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/?id=${ this.id }`, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.carsSellURL, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.logosURL, this.generateOptions()),
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()),
    ]).subscribe(res => {
      this.car_info = res[0].data2.filter((item: any) => item.id === this.id)[0];
      this.car_buy_data = res[1].data.filter((item: any) => item.attributes.car.data.id === this.id)[0];
      this.logo = res[2].data.filter((item: any) => item.attributes.user.data.id === res[3].id)[0];
      if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
      this.me = res[3];

    


 


    

    });
  }

  private generateOptions = () => {
    return {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ this.jwt }` })
    }
  }

  private loadQueryParams = () => {
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
      this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');
  }

  private query = () => this.requestService.generateQuery({
    populate: ['owner', 'client', 'car', 'user', 'logo']
  });

}
