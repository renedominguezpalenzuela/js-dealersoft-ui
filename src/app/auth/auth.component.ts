import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public showButtons: boolean = true;
  private readonly urls = ['/auth/login', '/auth/register'];

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.showButtons = this.urls.includes(event.urlAfterRedirects));
  }

  ngOnInit(): void {
  }

}
