import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();
  public openSide = false;

  overlay: any = null;
  toggleOpen = () => {
    this.openSide = !this.openSide;
    
    if(this.openSide == true){
      this.overlay.style.display = 'block';
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = 'auto'
      this.overlay.style.display = 'none';
    }
  };

  offOpenSide(){
    this.openSide = false
    document.body.style.overflow = 'auto'
    this.overlay.style.display = 'none';
  }

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
    this.overlay = document.getElementById('overlay');

    this.x = document.getElementById('login-register-div');
  }
}
