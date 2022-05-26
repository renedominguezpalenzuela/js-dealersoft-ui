import { Component, OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
