import { Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor( private renderer: Renderer2) {

    this.renderer.addClass(document.body, 'color_fondo');

   }

  ngOnInit(): void {
  }

}
