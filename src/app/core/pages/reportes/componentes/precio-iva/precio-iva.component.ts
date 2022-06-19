import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-iva',
  templateUrl: './precio-iva.component.html',
  styleUrls: ['./precio-iva.component.scss']
})
export class PrecioIvaComponent implements OnInit {

  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
