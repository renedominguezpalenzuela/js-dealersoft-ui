import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-compra-iva',
  templateUrl: './precio-compra-iva.component.html',
  styleUrls: ['./precio-compra-iva.component.scss']
})
export class PrecioCompraIvaComponent implements OnInit {

  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
