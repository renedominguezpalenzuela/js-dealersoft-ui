import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  currentRoute:string;
  firstTime:boolean = true;
  @Output() mensaje = new EventEmitter<string>();
  public openSide = false;

  
  toggleOpen = () => {
    this.openSide = !this.openSide;
    this.firstTime = false
    if(this.openSide == true){
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = 'auto'
  
    }
  };

  offOpenSide(){
    this.openSide = false
    document.body.style.overflow = 'auto'
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
  
  public navigationSection(link: any) {
    let x = document.getElementById(link);
    if (x) {
      if(this.openSide){
        this.openSide = false;
      }
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            console.log('Route change detected');
        }

        if (event instanceof NavigationEnd) {
            // Hide progress spinner or progress bar
            this.currentRoute = event.url;          
            console.log(event);
        }

        if (event instanceof NavigationError) {
            console.log(event.error);
        }
    });
   }

  ngOnInit(): void {
    this.x = document.getElementById('login-register-div');
  }
}
