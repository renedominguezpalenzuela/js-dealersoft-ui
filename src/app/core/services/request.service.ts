import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryParams } from '@core/interfaces';

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private httpClient: HttpClient) {
  }

  get headers() {
    return new HttpHeaders({ Accept: 'application/json' });
  }

  public Get = (url: string, params?: HttpParams): Observable<any> => {
    if (params instanceof HttpParams) return this.httpClient.get(url, { headers: this.headers, params });
    else return this.httpClient.get(url, { headers: this.headers });
  };

  public Post = (url: string, data: any, asData: boolean = true): Observable<any> => {
    return this.httpClient.post(url, asData ? { data } : data, { headers: this.headers });
  };

  public Put = (url: string, data: any, asData: boolean = true): Observable<any> => {
    return this.httpClient.put(url, asData ? { data } : data, { headers: this.headers });
  };

  public Delete = (url: string): Observable<any> => {
    return this.httpClient.delete(url, { headers: this.headers });
  };

  public downloadPDF = (url: string, data: any): Observable<any> => {
    const headers = new HttpHeaders({ Accept: 'application/pdf', 'Content-Type': 'application/json' });
    return this.httpClient.post(url, { data }, { headers, responseType: 'blob' });
  }

  public generateQuery = (params: QueryParams): HttpParams => {
    let query = new HttpParams();
    const concat = (array: string[]) => array.join(',');
    if (params.populate) query = query.set('populate', concat(params.populate));
    if (params.fields) query = query.set('fields', concat(params.fields));
    if (params.sort) query = query.set('fields', concat(params.sort.map(elm => `${ elm.field }::${ elm.order }`)));
    if (params['pagination[withCount]']) query = query.set('pagination[withCount]', params['pagination[withCount]']);
    if (params['pagination[page]']) query = query.set('pagination[page]', params['pagination[page]']);
    if (params['pagination[pageSize]']) query = query.set('pagination[pageSize]', params['pagination[pageSize]']);
    if (params['pagination[start]']) query = query.set('pagination[start]', params['pagination[start]']);
    if (params['pagination[limit]']) query = query.set('pagination[limit]', params['pagination[limit]']);
    if (params.filters)
      params.filters.forEach((elm, i) => query = query.set(`filters[${ elm.option }][${ i }][${ elm.field }][${ elm.operator }]`, elm.value));
    return query;
  }

  public POSTUpload = (url: string, files: FormData): Observable<any> => {
    return this.httpClient.post(url, files, { headers: this.headers, reportProgress: true, observe: 'events' });
  }
}

export enum ExportType {
  stock = 'my-stock',
  buy_sell = 'buy-sell',
  win_lose = 'win-lose',
  vehicle = 'vehicle',
  source = 'source',
  private = 'private',
  business = 'business',
  net_export = 'net-export',
  net_ue_export = 'net-ue-export',
  invoice = 'invoice',
  bot_gewerbe = 'gewerbe',
  bot_privado = 'privado',
  bot_export = 'export',
  bot_ue_export = 'ue-export',

}
