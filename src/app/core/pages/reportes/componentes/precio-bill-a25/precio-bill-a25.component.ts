import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-bill-a25',
  templateUrl: './precio-bill-a25.component.html',
  styleUrls: ['./precio-bill-a25.component.scss']
})
export class PrecioBillA25Component implements OnInit {


  @Input() lista_articulos: any;
  constructor() { }

  ngOnInit(): void {
  }

}
