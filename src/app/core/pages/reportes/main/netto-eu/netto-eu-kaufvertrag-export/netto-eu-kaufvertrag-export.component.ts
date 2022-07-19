import { Component } from '@angular/core';
import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatosReportesService } from '../../../../../../servicios/datos-reportes.service';


@Component({
  selector: 'app-netto-eu-kaufvertrag-export',
  templateUrl: './netto-eu-kaufvertrag-export.component.html',
  styleUrls: ['./netto-eu-kaufvertrag-export.component.scss']
})
export class NettoEuKaufvertragExportComponent  {
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
