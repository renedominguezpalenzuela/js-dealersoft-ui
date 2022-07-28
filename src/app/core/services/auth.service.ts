import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces';
import * as moment from 'moment';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ApiHelperService, RequestService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private AuthUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private AuthJWT: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  // private readonly httpClient: HttpClient,
  //   private readonly apiHelperService: ApiHelperService,
  //   private readonly requestService: RequestService, 
  constructor() {
    this.loadRememberMe();
    this.loadAuthUser();
    this.loadJWT();
  }

  private _rememberMe: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get rememberMe(): boolean {
    return this._rememberMe.getValue();
  }

  get isAuth(): boolean {


    return !!this.AuthJWT.getValue() && !!this.AuthUser.getValue();
  }

  get JWT(): string | null {
    return this.AuthJWT.getValue();
  }

  get currentUser(): Observable<User | null> {
    return this.AuthUser.asObservable();
  }

  set updateUser(value: User | null) {
    if (this.rememberMe) {
      localStorage.setItem('Auth-User', JSON.stringify(value));
    } else {
      sessionStorage.setItem('Auth-User', JSON.stringify(value));
    }
    this.AuthUser.next(value);
  }

  set updateJWT(value: string | null) {
    if (this.rememberMe) {
      localStorage.setItem('Auth-JWT', <string>value);
    } else {
      sessionStorage.setItem('Auth-JWT', <string>value);
    }
    this.AuthJWT.next(value);
  }

  set updateRememberMe(value: boolean) {
    this._rememberMe.next(value);
  }

  get #activeUntil(): number {
    return moment(this.AuthUser.getValue()?.active_until).diff(moment(), 'days');
  }


  // private generateOptions = () => {
  //   return {
  
  //     headers: new HttpHeaders({ Authorization: `Bearer ${ this.AuthJWT.getValue() }` })
  //   }
  // }

  

  


  get isFullRegistered(): boolean {

     const isFullRegistered = <boolean>this.AuthUser.getValue()?.full_registration
     return isFullRegistered;

    //  if (isFullRegistered) {
    //   return true;
    //  } else {
    //    this.httpClient.get<any>(this.apiHelperService.meURL, this.generateOptions()).subscribe(()=>{
    //     return false;
    //    })
    //  }
     
  }

  public loadRememberMe = () => {
    if (localStorage.getItem('rememberMe')) {
      this.updateRememberMe =
        <string>localStorage.getItem('rememberMe') === 'TRUE';
    } else {
      this.updateRememberMe = false;
      localStorage.setItem('rememberMe', 'FALSE');
    }
  };


  public loadAuthUser = () => {
    if (this.rememberMe) {
      if (localStorage.getItem('Auth-User')) {
        this.AuthUser = new BehaviorSubject<User | null>(
          JSON.parse(<string>localStorage.getItem('Auth-User'))
        );
      } else {
        this.AuthUser = new BehaviorSubject<User | null>(null);
      }
    } else {
      if (sessionStorage.getItem('Auth-User')) {
        this.AuthUser = new BehaviorSubject<User | null>(
          JSON.parse(<string>sessionStorage.getItem('Auth-User'))
        );
      } else {
        this.AuthUser = new BehaviorSubject<User | null>(null);
      }
    }
  };

  public loadJWT = () => {
    if (this.rememberMe) {
      if (localStorage.getItem('Auth-JWT')) {
        this.AuthJWT = new BehaviorSubject<string | null>(
          <string>localStorage.getItem('Auth-JWT')
        );
      } else {
        this.AuthJWT = new BehaviorSubject<string | null>(null);
      }
    } else {
      if (sessionStorage.getItem('Auth-JWT')) {
        this.AuthJWT = new BehaviorSubject<string | null>(
          <string>sessionStorage.getItem('Auth-JWT')
        );
      } else {
        this.AuthJWT = new BehaviorSubject<string | null>(null);
      }
    }
  };

  public isOnTrial = () => this.#activeUntil > 0;
}
