import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiHelperService {
  private readonly _apiUrl: string;
  private readonly _hostUrl: string;

  constructor() {
    this._apiUrl = environment.URL_API;
    this._hostUrl = environment.URL_HOST;
  }

  get hostUrl(): string {
    return this._hostUrl;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  get loginURL(): string {
    return `${ this.apiUrl }/auth/local`;
  }

  get registerURL(): string {
    return `${ this.apiUrl }/auth/local/register`;
  }

  get carsURL(): string {
    return `${ this.apiUrl }/cars`;
  }

  get clientsURL(): string {
    return `${ this.apiUrl }/clients`;
  }

  get carsBuyURL(): string {
    return `${ this.apiUrl }/cars-buy-data`;
  }

  get carsSellURL(): string {
    return `${ this.apiUrl }/cars-sell-data`;
  }

  get pdfURL(): string {
    return `${ this.apiUrl }/generatePDF`;
  }

  get invoicesURL(): string {
    return `${ this.apiUrl }/invoices`;
  }

  get uploadFilesURL(): string {
    return `${ this.apiUrl }/upload`;
  }

  get usersURL(): string {
    return `${ this.apiUrl }/users`;
  }



  get meURL(): string {
    return `${ this.apiUrl }/users/me`;
  }

  get logosURL(): string {
    return `${ this.apiUrl }/logos`;
  }

  get getPriceURL(): string {
    return `${ this.apiUrl }/getPrice`;
  }

  get getKeyURL(): string {
    return `${ this.apiUrl }/getKey`;
  }

  get payURL(): string {
    return `${ this.apiUrl }/pay`;
  }

  get forgotPasswordURL(): string {
    return `${ this.apiUrl }/auth/forgot-password`;
  }

  get resetPasswordURL(): string {
    return `${ this.apiUrl }/auth/reset-password`;
  }

  get sendMailURL(): string {
    return `${ this.apiUrl }/mail`;
  }
  

}
