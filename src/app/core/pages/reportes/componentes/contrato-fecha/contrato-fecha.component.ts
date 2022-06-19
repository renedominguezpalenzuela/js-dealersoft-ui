import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contrato-fecha',
  templateUrl: './contrato-fecha.component.html',
  styleUrls: ['./contrato-fecha.component.scss']
})
export class ContratoFechaComponent implements OnInit {

  constructor() { }

  @Input() car_buy_data: any;
  @Input() me: any;
  ngOnInit(): void {
  }

}
