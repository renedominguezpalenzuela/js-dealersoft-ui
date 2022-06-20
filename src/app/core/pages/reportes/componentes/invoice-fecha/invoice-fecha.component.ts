import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-invoice-fecha',
  templateUrl: './invoice-fecha.component.html',
  styleUrls: ['./invoice-fecha.component.scss']
})
export class InvoiceFechaComponent implements OnInit {

  constructor() { }

  @Input() car_buy_data: any;
  @Input() me: any;
  ngOnInit(): void {

    
  }

}
