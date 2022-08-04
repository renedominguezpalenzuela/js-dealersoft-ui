import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

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
  x:any;
  public naviagateToTab(tab_name: any) {
    
    if (tab_name === 'register') {
      if (this.x) {
        this.mensaje.emit('0');
      }
      
      const timeoutId = setTimeout(() => {
        this.x.scrollIntoView({ behavior: 'smooth' });
      }, 200);

      //clearTimeout(timeoutId);
    }

    if (tab_name === 'login-reg') {
      if (this.x) {
        this.x.scrollIntoView({ behavior: 'smooth' });
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
      if(this.openSide){
        this.openSide = false;
      }
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.x = document.getElementById('login-register-div');
  }
}
