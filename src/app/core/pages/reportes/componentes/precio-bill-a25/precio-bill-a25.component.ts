import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-bill-a25',
  templateUrl: './precio-bill-a25.component.html',
  styleUrls: ['./precio-bill-a25.component.scss']
})
export class PrecioBillA25Component implements OnInit {


  @Input() lista_articulos: any;
  public total:any = 0;
  constructor() { }

  ngOnInit(): void {

   this.lista_articulos.map((unArticulo: any)=>{
      this.total = this.total + unArticulo.quantity * unArticulo.unit_price
    })

    

  }

}
