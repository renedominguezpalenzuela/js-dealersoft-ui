import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-landing-register-login',
  templateUrl: './landing-register-login.component.html',
  styleUrls: ['./landing-register-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingRegisterLoginComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() selectedTab: any = null;
  ngOnInit(): void {}

  ngOnChanges() {
    console.log('Onchanges');

    console.log(this.selectedTab);
  }
}
