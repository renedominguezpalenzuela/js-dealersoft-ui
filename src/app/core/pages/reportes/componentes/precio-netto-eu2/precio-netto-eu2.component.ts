import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-netto-eu2',
  templateUrl: './precio-netto-eu2.component.html',
  styleUrls: ['./precio-netto-eu2.component.scss']
})
export class PrecioNettoEu2Component implements OnInit {
  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
