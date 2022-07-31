import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public openSide = false;

  toggleOpen = () => {
    this.openSide = !this.openSide;
  };
  constructor() {}

  ngOnInit(): void {}
}
