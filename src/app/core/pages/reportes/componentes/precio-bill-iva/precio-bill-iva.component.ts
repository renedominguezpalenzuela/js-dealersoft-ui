import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-bill-iva',
  templateUrl: './precio-bill-iva.component.html',
  styleUrls: ['./precio-bill-iva.component.scss']
})
export class PrecioBillIvaComponent implements OnInit {

  @Input() lista_articulos: any;
  public total:any = 0;
  public iva:any = 0;
  public brutto:any = 0;

  constructor() { }

  ngOnInit(): void {
    this.lista_articulos.map((unArticulo: any)=>{
      this.total = this.total + unArticulo.quantity * unArticulo.unit_price
    })

    this.iva = (19 * this.total) / 100;

    this.brutto = this.total + this.iva;
  }

}
