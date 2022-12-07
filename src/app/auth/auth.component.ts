import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { Globals } from '../globales';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [Globals]
})
export class AuthComponent implements OnInit {

  public version:any ="";
  public showButtons: boolean = true;
  private readonly urls = ['/auth/login', '/auth/register'];

  constructor(private readonly router: Router, private renderer: Renderer2,   private readonly globales: Globals) {

    this.renderer.addClass(document.body, 'color_fondo');
    this.version = this.globales.version; 
   // console.log("Version "+this.version);


    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.showButtons = this.urls.includes(event.urlAfterRedirects));
  }

  ngOnInit(): void {
  }

  public toAdmin = () => this.router.navigate(['/admin']);
}
