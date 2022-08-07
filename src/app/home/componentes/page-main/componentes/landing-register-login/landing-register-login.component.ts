import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-landing-register-login',
  templateUrl: './landing-register-login.component.html',
  styleUrls: ['./landing-register-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingRegisterLoginComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() selectedTab: any = null;

  @Output() mensaje = new EventEmitter<string>();
  x:any;
  @ViewChild('tabGroup') tabGroup:any;

  public naviagateToTab(tab_name: any) {
    

    if (tab_name === 'register') {
      if (this.x) {
        this.mensaje.emit('0');
      }
      this.x?.scrollIntoView({ behavior: 'smooth' });
   

      //clearTimeout(timeoutId);
    }

    if (tab_name === 'login-reg') {
      if (this.x) {
        this.mensaje.emit('1');
      }
      
      this.x?.scrollIntoView({ behavior: 'smooth' });
      
    }
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    
    if(tabChangeEvent.index == 1){
      this.naviagateToTab('login-register')
    }
    else{
      this.naviagateToTab('register')
    }
  }

  
  ngOnInit(): void {
    this.x = document.getElementById("login-register-div")
  }

  ngOnChanges() {
    this.x.scrollIntoView({ behavior: 'smooth' });   
  }

  ngAfterViewInit() {
    
  }

  receiveMessage(msg: any) {
    this.selectedTab = msg;


  }
}
