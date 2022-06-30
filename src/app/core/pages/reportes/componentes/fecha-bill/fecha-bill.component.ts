import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fecha-bill',
  templateUrl: './fecha-bill.component.html',
  styleUrls: ['./fecha-bill.component.scss']
})
export class FechaBillComponent implements OnInit {

  @Input() invoice_number: any;
  @Input() invoice_date: any;
  @Input() user_city: any;

  constructor() { }

  ngOnInit(): void {
  }

}
