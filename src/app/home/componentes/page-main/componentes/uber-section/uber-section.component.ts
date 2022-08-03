import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uber-section',
  templateUrl: './uber-section.component.html',
  styleUrls: ['./uber-section.component.scss']
})
export class UberSectionComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();
  
  public naviagateToTab(tab_name: any) {
    let x = document.getElementById('login-register-div');

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
