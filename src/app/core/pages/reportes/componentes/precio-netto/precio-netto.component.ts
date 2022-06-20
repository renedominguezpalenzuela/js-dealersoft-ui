import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-netto',
  templateUrl: './precio-netto.component.html',
  styleUrls: ['./precio-netto.component.scss']
})
export class PrecioNettoComponent implements OnInit {

  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
