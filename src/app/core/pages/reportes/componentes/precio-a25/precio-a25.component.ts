import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-a25',
  templateUrl: './precio-a25.component.html',
  styleUrls: ['./precio-a25.component.scss']
})
export class PrecioA25Component implements OnInit {

  constructor() { }

  @Input() car_buy_data: any;
  ngOnInit(): void {

   
  }

}
