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
    let x = document.getElementById('login-register');

    if (tab_name === 'register') {
      console.log(this.mensaje);
      this.mensaje.emit('0');
    } else {
      this.mensaje.emit('1');
    }

    if (x) {
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public navigationSection(link: any) {
    let x = document.getElementById(link);
    if (x) {
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
