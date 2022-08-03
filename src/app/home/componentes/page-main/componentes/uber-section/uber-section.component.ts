import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uber-section',
  templateUrl: './uber-section.component.html',
  styleUrls: ['./uber-section.component.scss']
})
export class UberSectionComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();
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
  constructor() { }

  ngOnInit(): void {
    this.x = document.getElementById('login-register-div');

  }

}
