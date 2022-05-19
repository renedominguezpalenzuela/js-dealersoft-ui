import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
