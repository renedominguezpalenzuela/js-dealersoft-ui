import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public selectedTab: any = 1;

  public navigationTop() {
    let x = document.getElementById('top');
    if (x) {
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }
  constructor() {}

  ngOnInit(): void {}

  receiveMessage(msg: any) {
    this.selectedTab = msg;
    console.log("Mensaje "+msg)

    //alert(msg);
  }
}
