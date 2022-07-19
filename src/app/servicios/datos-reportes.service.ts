import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ApiHelperService, RequestService } from '@core/services';

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


  
  get imgPath(): string {
    //let img_url = this.logo?.data[0].attributes.logo.data.attributes.url;  
    
    
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


  public loadPaginatedData = (id: any, jwt: any) => {
    forkJoin([
      this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions(jwt)),           
      this.httpClient.get<any>(`${ this.apiHelperService.carsURL }/${ id }`)      
    ]).subscribe((res:any) => {
     this.me = res[0];
     let user_id = this.me.id;
     this.car_info = res[1];    
     this.car_buy_data = this.car_info.data.attributes.buy;     
     this.httpClient.get<any>(`${this.apiHelperService.logosURL}?filters[user][id][$eq]=${user_id}&populate=logo`).subscribe(
      (dato)=>{
        this.image_url=dato?.data[0].attributes.logo.data.attributes.url;                       
        if (this.image_url)   this.showLogo = true;        
      }
     )
    });
  }


  

  private generateOptions = (jwt: any) => {
    return {
      params: this.query(),
      headers: new HttpHeaders({ Authorization: `Bearer ${ jwt }` })
    }
  }

  // private loadQueryParams = () => {
  //   if (this.activatedRoute.snapshot.queryParamMap.has('id'))
  //     this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');
  // }

  private query = () => this.requestService.generateQuery({
    populate: ['owner', 'client', 'car', 'user', 'logo']
  });

}
