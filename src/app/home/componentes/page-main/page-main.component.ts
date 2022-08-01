import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {

  @Input() selectedTab: any;

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

}
