import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-netto2',
  templateUrl: './precio-netto2.component.html',
  styleUrls: ['./precio-netto2.component.scss']
})
export class PrecioNetto2Component implements OnInit {

  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
