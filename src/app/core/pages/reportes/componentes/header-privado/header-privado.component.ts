import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-privado',
  templateUrl: './header-privado.component.html',
  styleUrls: ['./header-privado.component.scss'],
})
export class HeaderPrivadoComponent implements OnInit {
  @Input() me: any;
  @Input() car_buy_data: any;
  @Input() imgPath: any;
  constructor() {}

  ngOnInit(): void {

  }
}
