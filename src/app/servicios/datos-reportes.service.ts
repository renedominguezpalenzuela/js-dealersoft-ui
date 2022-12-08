import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ApiHelperService, RequestService } from '@core/services';

import {  FilterDeepOption } from '@core/interfaces';
import { FilterOperator } from '@core/interfaces/query-params';

@Injectable({
  providedIn: 'root'
})
export class DatosReportesService {

  
  constructor(private readonly httpClient: HttpClient,
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService) {

  }


  
  public showLogo: boolean = false;

  public image_url: any;
  public car_info: any;
  public car_buy_data: any;
  public logo: any;
  public me: any;

  public bill_info: any;
  public invoice_number: any;
  public reference_invoice_number: any;
  public invoice_date: any;
  public user_city: any; 
  public client: any; 
  
  get imgPath(): string {       
      if (this.showLogo) {
        if (this.image_url.substring(0,4)==='http') {
          return this.image_url
        } else {
          return `${ this.apiHelperService.hostUrl }${ this.image_url }`;
        }            
      }  
      else  {
        return `assets/brand_logo/Dealersoft.de-black.svg`;
      }
    }




  

  private generateOptions = (jwt: any) => {
    return {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ jwt }` })
    }
  }
 
  private query = () => this.requestService.generateQuery({
    populate: ['owner', 'client', 'car', 'user', 'logo']
  });
  

  
  public loadPaginatedData = (id: any, jwt: any, buyScreen:boolean) => {
    forkJoin([
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions(jwt)),           
      this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/${ id }`)      
    ]).subscribe((res:any) => {
     this.me = res[0];
     let user_id = this.me.id;
     this.car_info = res[1];   
     
     if (buyScreen) {
       this.car_buy_data = this.car_info.data.attributes.buy;     
     } else {
      this.car_buy_data = this.car_info.data.attributes.sell;     
     }
    
     this.httpClient.get<any>(`${this.apiHelperService.logosURL}?filters[user][id][$eq]=${user_id}&populate=logo`).subscribe(
      (dato)=>{
        this.image_url=dato?.data[0].attributes.logo.data.attributes.url;                       
        if (this.image_url)   this.showLogo = true;        
      }
     )
    });
  }


  public loadPaginatedDataInvoices = (id: any, jwt: any) => {
    forkJoin([ 
     
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions(jwt)),
      this.httpClient.get<any>(`${  this.apiHelperService.invoicesURL }/${ id }`, this.generateOptionsInvoice( id, jwt)),

    ]).subscribe(res => {


      this.me = res[0];
      let user_id = this.me.id;

      this.bill_info = res[1].data.attributes;

      if (this.bill_info.invoice_type===2) {
        this.invoice_number =  this.bill_info.cancel_number;
        this.reference_invoice_number=  this.bill_info.reference_invoice_number;

      } else {
         this.invoice_number =  this.bill_info.invoice_number;
      }



      this.invoice_date = this.bill_info.date;

      this.user_city = this.bill_info.owner.data.attributes.city

      //this.client = this.bill_info.client.data.attributes;
      
      this.client = this.bill_info.owner.data.attributes;
      //this.client = this.bill_info;


      this.httpClient.get<any>(`${this.apiHelperService.logosURL}?filters[user][id][$eq]=${user_id}&populate=logo`).subscribe(
        (dato)=>{
          this.image_url=dato?.data[0].attributes.logo.data.attributes.url;                       
          if (this.image_url)   this.showLogo = true;        
        });


      


 
      //  this.logo = res[1].data.filter((item: any) => item.attributes.user.data.id === res[2].id)[0];
      //  if (this.logo?.attributes.logo.data.attributes.url) this.showLogo = true;
      //  this.me = res[2];

       
    
    });
  }

  
  private generateOptionsInvoice = (id: any, jwt: any) => {
    return {
      params: this.queryInvoice(id),
      headers: new HttpHeaders({ Authorization: `Bearer ${ jwt }` })
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
