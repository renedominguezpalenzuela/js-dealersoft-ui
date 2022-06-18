import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-privado',
  templateUrl: './footer-privado.component.html',
  styleUrls: ['./footer-privado.component.scss']
})
export class FooterPrivadoComponent implements OnInit {

  constructor() { }

  @Input() me:any;  
  @Input() car_buy_data:any; 
  ngOnInit(): void {
  }

}
