import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-contrato-fecha-compra',
  templateUrl: './contrato-fecha-compra.component.html',
  styleUrls: ['./contrato-fecha-compra.component.scss']
})
export class ContratoFechaCompraComponent implements OnInit {

  @Input() car_buy_data: any;
  @Input() me: any;
  constructor() { }

  ngOnInit(): void {
  }

}
