import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-precio-compra',
  templateUrl: './precio-compra.component.html',
  styleUrls: ['./precio-compra.component.scss']
})
export class PrecioCompraComponent implements OnInit {

  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
