import { Component, HostListener, OnInit } from '@angular/core';




@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {
  
  public selectedTab: any = 1;
  startAnimation:boolean = false;
  startAnimationUp:boolean = false;
  rotateAnimation:boolean = false;
  currentScroll:any = 0;
  text_banner1:any;
  position_text:any;
  logo_funktionen:any;
  height_device:any;
  phone:any;
  morePhone:boolean = window.screen.width > 992;

  getPositionY(item:any){
    
    return item.getBoundingClientRect();
  }

   isInViewport(el:any) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

  heightPhone:any;
  @HostListener('window:scroll', ['$event.target'])
  onScroll(e:any) {
      this.currentScroll = window.pageYOffset;
      if(this.heightPhone < this.currentScroll && this.morePhone){
        this.startAnimation = true
      }

      if(this.morePhone && this.isInViewport(this.text_banner1)){
        this.startAnimationUp = true;
      }
      else{
        this.startAnimationUp = false
      }

      if(this.isInViewport(this.logo_funktionen)){
        this.rotateAnimation = true;
      }

      else{
        this.rotateAnimation = false;
      }

      
  }

  constructor() { }

  ngOnInit(): void {
    this.phone = document.getElementById("phone2")
    this.height_device = window.screen.height;
    this.heightPhone = this.getPositionY(this.phone).height + 40;
    this.text_banner1 = document.getElementById("text_banner1")
    this.logo_funktionen = document.getElementById("logo_funktionen");
  }

  //public selectedTab: any = 1;

  public navigationTop() {
    let x = document.getElementById('top');
    if (x) {
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }
  receiveMessage(msg: any) {
    this.selectedTab = msg;

    //alert(msg);
  }
}
