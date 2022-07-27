import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.scss']
})
export class TopSectionComponent implements OnInit {


  @Input() nombre: any = null;
  @Input() arreglo_tarjetas: any = null;

  public estatura: any = 10;

  


  constructor() {

   }

  ngOnInit(): void {


    this.estatura = 100;
    console.log(this.arreglo_tarjetas)

   

  }

}
