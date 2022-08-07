import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {

  constructor(private cookie:CookieService) { }

  notwending:boolean = true;
  performance:boolean = false;
  funktional:boolean = false;
  color:string = "accent";
  
  novisited:boolean = true;

  changed(){
    this.notwending = true;
    console.log("cambioss")
  }

  aceptCookie(){
    this.novisited = false
    this.cookie.set("accept_cookie", 'true', {expires: 7});
    this.cookie.set("notwending", 'true', {expires:7})
    this.cookie.set("performance", this.performance.toString(), {expires:7})
    this.cookie.set("funktional", this.funktional.toString(), {expires:7})
    this.cookie.set('visited', this.novisited.toString(), {expires:7})
  }  

  declineCookie(){
    this.novisited = false
    this.cookie.set("accept_cookie", 'false', {expires: 7});
    this.cookie.set("notwending", 'true', {expires:7})
    this.cookie.set("performance", this.performance.toString(), {expires:7})
    this.cookie.set("funktional", this.funktional.toString(), {expires:7})
    this.cookie.set('visited', this.novisited.toString(), {expires:7})
  }  

  ngOnInit(): void {
    this.novisited = this.cookie.get('visited') == undefined || this.cookie.get('visited') == "";
    console.log("hola" + this.cookie.get('visited'))
  }

}
