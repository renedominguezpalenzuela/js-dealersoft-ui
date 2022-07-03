import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-empresa',
  templateUrl: './footer-empresa.component.html',
  styleUrls: ['./footer-empresa.component.scss']
})
export class FooterEmpresaComponent implements OnInit {


   //static static_pagina_actual = 0;
   //pagina_actual!: number;

  @Input() me:any;  
  @Input() car_buy_data:any;  

  
  
  constructor() {

    //FooterEmpresaComponent.static_pagina_actual++;
    //this.pagina_actual = Number(FooterEmpresaComponent.static_pagina_actual)

   }

  ngOnInit(): void {

 
  
  }

 

}
