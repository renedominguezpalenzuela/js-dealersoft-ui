import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {
    this.overlay = document.getElementById("overlay");
  }
}
