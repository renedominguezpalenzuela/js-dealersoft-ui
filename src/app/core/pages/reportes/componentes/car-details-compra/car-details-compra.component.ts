import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-details-compra',
  templateUrl: './car-details-compra.component.html',
  styleUrls: ['./car-details-compra.component.scss']
})
export class CarDetailsCompraComponent implements OnInit {

  
  @Input() car_info:any; 
  @Input() car_buy_data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
