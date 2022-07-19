import { Component } from '@angular/core';
import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatosReportesService } from '../../../../../../servicios/datos-reportes.service';



@Component({
  selector: 'app-kaufvertrag-iva',
  templateUrl: './kaufvertrag-iva.component.html',
  styleUrls: ['./kaufvertrag-iva.component.scss']
})
export class KaufvertragIvaComponent {

  public id: number = 1;
  public currentUrl: string;
  public readonly jwt: string;

  constructor(
    private readonly apiHelperService: ApiHelperService,
//    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  //  private readonly httpClient: HttpClient
  public readonly datosReportes: DatosReportesService
  ) {
    
    this.currentUrl = `${ window.location.hostname }/export/vehicle`;
    this.jwt = <string>this.activatedRoute.snapshot.paramMap.get('jwt');
    if (this.activatedRoute.snapshot.queryParamMap.has('id'))
    this.id = +<number><unknown>this.activatedRoute.snapshot.queryParamMap.get('id');

    this.datosReportes.loadPaginatedData(this.id, this.jwt, false);

   
  }

 

}
