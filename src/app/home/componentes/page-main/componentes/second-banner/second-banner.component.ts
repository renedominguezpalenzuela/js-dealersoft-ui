import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-second-banner',
  templateUrl: './second-banner.component.html',
  styleUrls: ['./second-banner.component.scss'],
})
export class SecondBannerComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();
  
  @Input() animation:boolean = false;
  @Input() animation_up:boolean = false;
  x:any;
  phone:any;
  

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

  constructor() {}

  ngOnInit(): void {
    this.x = document.getElementById('login-register-div');
    this.phone = document.getElementById('phone2');

  }

  ngOnChanges(): void{
    
  }
}
