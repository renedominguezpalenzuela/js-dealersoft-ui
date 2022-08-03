import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  resolution = window.screen.width
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

  constructor() {};
  
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
    
    if(this.resolution > 1024){
      this.offset = window.pageYOffset;
      this.scroll = e.scrollingElement.scrollTop
      this.el.style.transform = 'translateY(' + this.offset * 0.5 + 'px)' 
      this.el1.style.transform = 'translateY(' + this.offset * 0.59 + 'px)' 
      this.el2.style.transform = 'translateY(' + this.offset * 0.3 + 'px)'  
      this.el3.style.transform = 'translateY(' + this.offset * 0.21 + 'px)'   
      this.main_text.style.transform = 'translateY(' + this.offset * 0.1 + 'px)' 

      if(this.getPositionY(this.text_secondB) - this.offset <=100){
        this.text_secondB.style.transform = 'translateY(' + (this.offset - this.getPositionY(this.text_secondB)) * 0.1 + 'px)' 
      }
      if(this.getPositionY(this.right_second) - this.offset <=100){
        this.right_second.style.transform = 'translateY(' + (this.offset - this.getPositionY(this.right_second)) * 0.08 + 'px)' 
      }
    }
    
  }

  ngOnInit(): void {
    
    this.el = document.getElementById("elipsi");
    this.el1 = document.getElementById("elipsi1");
    this.el2 = document.getElementById("elipsi2");
    this.el3 = document.getElementById("elipsi3");
    this.main_text = document.getElementById("main_text")
    this.text_secondB = document.getElementById("text_secondbanner")
    this.right_second = document.getElementById("left_second")
    this.element = document.getElementById("login-register-div");
  }

  
}
