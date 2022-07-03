import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-footer-empresa2',
  templateUrl: './footer-empresa2.component.html',
  styleUrls: ['./footer-empresa2.component.scss']
})
export class FooterEmpresa2Component implements OnInit {

  @Input() me:any;  
  @Input() car_buy_data:any;  
  @Input() pagina_actual: any;
  @Input() pagina_total: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
