import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public selectedTab: any = 1;

  ABG:boolean = false;

  toggleABG(){
    this.ABG = !this.ABG;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public navigationTop() {
    
    window.scrollTo(0, 0);
   
  }
  receiveMessage(msg: any) {
    this.selectedTab = msg;

    //alert(msg);
  }
}
