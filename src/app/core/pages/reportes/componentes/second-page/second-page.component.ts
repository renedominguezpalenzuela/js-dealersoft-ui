import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  @Input() car_buy_data: any;
  @Input() me: any;
  @Input() imgPath: any;
  @Input() car_info: any;

  @Input() empresa: any;

  constructor() { }


  ngOnInit(): void {
  }

  

}
