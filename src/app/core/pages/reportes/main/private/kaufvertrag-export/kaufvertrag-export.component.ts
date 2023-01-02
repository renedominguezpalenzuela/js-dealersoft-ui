import { Component, OnInit } from '@angular/core';

//import { CarBuy, CarSell } from '@core/interfaces';
//import * as moment from 'moment';
import { ApiHelperService } from '@core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { forkJoin } from 'rxjs';
//import { environment } from '../../../../../../../environments/environment';
import { DatosReportesService } from '../../../../../../servicios/datos-reportes.service';



@Component({
  selector: 'app-kaufvertrag-export',
  templateUrl: './kaufvertrag-export.component.html',
  styleUrls: ['./kaufvertrag-export.component.scss']
})
export class KaufvertragExportComponent  {


  public currentUrl: string;
  public id: number = 1;
  private readonly jwt: string;

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
