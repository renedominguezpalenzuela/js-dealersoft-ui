import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contrato2-fecha',
  templateUrl: './contrato2-fecha.component.html',
  styleUrls: ['./contrato2-fecha.component.scss']
})
export class Contrato2FechaComponent implements OnInit {

  @Input() car_buy_data: any;
  @Input() me: any;
  constructor() { }

  ngOnInit(): void {
  }

}
