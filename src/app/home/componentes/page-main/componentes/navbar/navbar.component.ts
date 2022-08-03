import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();
  public openSide = false;

  toggleOpen = () => {
    this.openSide = !this.openSide;
  };
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
  public activeLink: string = 'home';
  public navigationSection(link: any) {
    let x = document.getElementById(link);
    if (x) {
      this.activeLink = link;
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
