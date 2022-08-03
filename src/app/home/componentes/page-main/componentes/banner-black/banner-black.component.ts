import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner-black',
  templateUrl: './banner-black.component.html',
  styleUrls: ['./banner-black.component.scss']
})
export class BannerBlackComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();
  public naviagateToTab(tab_name: any) {
    let x = document.getElementById('section-login-register');

    if (tab_name === 'register') {
      if (x) {
        x.scrollIntoView({ behavior: 'smooth' });
      }

      const timeoutId = setTimeout(() => {
        this.mensaje.emit('0');
      }, 700);

      //clearTimeout(timeoutId);
    }

    if (tab_name === 'login-reg') {
      if (x) {
        x.scrollIntoView({ behavior: 'smooth' });
      }
      const timeoutId = setTimeout(() => {
        this.mensaje.emit('1');
      }, 700);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
