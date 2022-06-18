import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-empresa',
  templateUrl: './footer-empresa.component.html',
  styleUrls: ['./footer-empresa.component.scss']
})
export class FooterEmpresaComponent implements OnInit {


  @Input() me:any;  
  @Input() car_buy_data:any;  
  
  constructor() { }

  ngOnInit(): void {
  }

}
