import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-netto-eu',
  templateUrl: './precio-netto-eu.component.html',
  styleUrls: ['./precio-netto-eu.component.scss']
})
export class PrecioNettoEuComponent implements OnInit {
  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
