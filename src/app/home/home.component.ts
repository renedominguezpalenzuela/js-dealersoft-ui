import { Component, OnInit, HostListener } from '@angular/core';
import {CookieService} from "ngx-cookie-service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  resolution:any;
  scroll:any = 0
  public navigationTop() {
    let x = document.getElementById('top');
    if (x) {
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getPositionY(item:any){
    
    return item.getBoundingClientRect().top;
  }

  constructor(public cookie:CookieService) {};
  
  el:any;
  el1:any;
  el2:any;
  el3:any;
  main_text:any;
  text_secondB:any;
  right_second:any;
  offset:any;
  element:any;

  @HostListener('window:scroll', ['$event.target'])

  onScroll(e:any) {
    
    if(this.resolution > 992){
      this.offset = window.pageYOffset;
      this.scroll = e.scrollingElement.scrollTop
      this.el.style.transform = this.el.style ? 'translateY(' + this.offset * 0.5 + 'px)' : null 
      this.el1.style.transform = this.el1.style ? 'translateY(' + this.offset * 0.4 + 'px)' : null
      this.el2.style.transform = this.el2.style ? 'translateY(' + this.offset * 0.3 + 'px)'  : null
      this.el3.style.transform = this.el3.style ? 'translateY(' + this.offset * 0.21 + 'px)' : null  
      if(this.getPositionY(this.text_secondB) - this.offset <=100){
        this.text_secondB.style.transform = this.text_secondB ? 'translateY(' + (this.offset - this.getPositionY(this.text_secondB)) * 0.1 + 'px)' :null
      }
      if(this.getPositionY(this.right_second) - this.offset <=100){
        this.right_second.style.transform = this.right_second ? 'translateY(' + (this.offset - this.getPositionY(this.right_second)) * 0.01 + 'px)' :null
      }
    }
    
  }

  ngOnInit(): void {
    this.resolution = window.screen.width;
    this.el = document.getElementById("elipsi");
    this.el1 = document.getElementById("elipsi1");
    this.el2 = document.getElementById("elipsi2");
    this.el3 = document.getElementById("elipsi3");
    
    this.text_secondB = document.getElementById("text_secondbanner")
    this.right_second = document.getElementById("left_second")
    this.element = document.getElementById("login-register-div");
  }

  
}
