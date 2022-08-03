import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {

  public selectedTab: any = 1;

  constructor() { }

  ngOnInit(): void {
    
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
