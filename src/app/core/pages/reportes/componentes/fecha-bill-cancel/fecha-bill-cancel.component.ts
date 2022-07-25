import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fecha-bill-cancel',
  templateUrl: './fecha-bill-cancel.component.html',
  styleUrls: ['./fecha-bill-cancel.component.scss']
})
export class FechaBillCancelComponent  {

  @Input() invoice_number: any;
  @Input() invoice_date: any;
  @Input() reference_invoice_number: any;
  @Input() user_city: any;
  constructor() { }

  

}
