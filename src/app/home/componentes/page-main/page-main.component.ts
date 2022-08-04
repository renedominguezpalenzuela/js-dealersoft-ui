import { Component, HostListener, OnInit } from '@angular/core';




@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {
  
  public selectedTab: any = 1;
  startAnimation:boolean = false;
  currentScroll:any = 0;
  phone:any;
  morePhone:boolean = window.screen.width > 992;

  getPositionY(item:any){
    
    return item.getBoundingClientRect();
  }

  heightPhone:any;
  @HostListener('window:scroll', ['$event.target'])
  onScroll(e:any) {
      this.currentScroll = window.pageYOffset;
      

      if(this.heightPhone < this.currentScroll){
        this.startAnimation = true
      }
  }

  constructor() { }

  ngOnInit(): void {
    this.phone = document.getElementById("phone2")
    this.heightPhone = this.getPositionY(this.phone).height;
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
