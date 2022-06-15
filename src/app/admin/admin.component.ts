import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  isDevMode 
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import {
  ApiHelperService,
  AuthService,
  LoadingService,
  NotificationService,
  RequestService,
} from '@core/services';
import { FilterDeepOption, User } from '@core/interfaces';
import { Link } from '@core/interfaces/link';
import * as moment from 'moment';
import { FilterOperator } from '@core/interfaces/query-params';
import { Logo } from '@core/interfaces/logo';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public loading: boolean = false;
  public links: Link[] = [
    {
      icon: 'add_circle_outline',
      label: 'Neues Fahrzeug',
      url: '/admin/new-vehicle',
      type: 'link',
    },
    {
      icon: 'directions_car_filled',
      label: 'Mein Bestand',
      url: '/admin/my-stock',
      type: 'link',
    },
    {
      icon: 'fact_check',
      label: 'Alle Fahrzeuge',
      url: '/admin/all-vehicles',
      type: 'link',
    },
    {
      icon: 'perm_identity',
      label: 'Kundendaten',
      url: '/admin/customer-information',
      type: 'link',
    },
    {
      icon: 'receipt_long',
      label: 'Ein- & Verkauf',
      url: '/admin/buying-selling',
      type: 'link',
    },
    {
      icon: 'price_change',
      label: 'Gewinn- und Verlust',
      url: '/admin/win-lose',
      type: 'link',
    },
    {
      icon: 'insert_chart_outlined',
      label: 'Fahrzeugauswertung',
      url: '/admin/vehicle-evaluation',
      type: 'link',
    },
    {
      icon: 'receipt',
      label: 'Neue Rechnung',
      url: '/admin/new-invoice',
      type: 'link',
    },
    {
      icon: 'request_quote',
      label: 'Diverse Rechnungen',
      url: '/admin/list-invoices',
      type: 'link',
    },
    {
      icon: 'logout',
      label: 'Logout',
      type: 'button',
    },
  ];
  public titlePage: string = 'Admin';
  public authUser: User | null = null;
  public isAuth: boolean = false;
  public days: number = 29;
  public logo: Logo | undefined;
  public showLogo: boolean = false;
  public showSide: boolean = false;
  @ViewChild('drawerSide') private drawerSide!: ElementRef<HTMLElement>;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loadingService: LoadingService,
    private readonly notificationService: NotificationService,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly renderer2: Renderer2,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(
        (event) =>
          (this.titlePage =
            this.links.find((link) =>
              event.urlAfterRedirects.includes(link.url)
            )?.label ?? 'Administrator')
      );
    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;

      this.days = moment(this.authUser?.active_until).diff(moment(), 'days');
      if (this.authUser && this.isAuth) {
        // this.requestService.Get(this.apiHelperService.usersURL, this.queryLogo(this.authUser?.id))

        let aquery = this.queryLogo(this.authUser?.id);
     
        this.requestService
          .Get(this.apiHelperService.logosURL, aquery)
          .subscribe((logos) => {
            
            this.logo = logos.data[0];
            if (this.logo?.attributes.logo.data.attributes.url)
              this.showLogo = true;
          });
      }
    });
  }

  private queryLogo = (id: number) =>
    this.requestService.generateQuery({
      populate: ['logo'],
      filters: [
        {
          field: '[user][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  get imgPath(): string {

    // console.log("URL")
    // console.log(this.logo?.attributes.logo.data.attributes.url)

    if (isDevMode()) {
      // console.log("DEV Mode")
       return `${this.apiHelperService.hostUrl}${this.logo?.attributes.logo.data.attributes.url}`;
    } else {      
      // console.log("PROD Mode")
     return `${this.logo?.attributes.logo.data.attributes.url}`;
    }
  }

  ngOnInit(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => (this.loading = loading));
    this.breakPoints();
  }

  public logOut() {
    this.authService.updateUser = null;
    this.authService.updateJWT = null;
    this.notificationService.riseNotification({
      color: 'success',
      data: 'Sitzung erfolgreich geschlossen',
    });
    this.router.navigate(['/auth/login']);
  }

  public toStripePayment = () => this.router.navigate(['/stripe-payment']);

  public toAdmin = () => this.router.navigate(['/admin']);

  public toggleSide() {
    this.showSide = !this.showSide;
    if (this.showSide) {
      this.renderer2.removeClass(
        this.drawerSide.nativeElement,
        'animate__fadeInLeft'
      );
      this.renderer2.addClass(
        this.drawerSide.nativeElement,
        'animate__fadeOutLeft'
      );
      setTimeout(() => {
        this.renderer2.setStyle(
          this.drawerSide.nativeElement,
          'display',
          'none'
        );
      }, 250);
    } else {
      this.renderer2.removeClass(
        this.drawerSide.nativeElement,
        'animate__fadeOutLeft'
      );
      this.renderer2.addClass(
        this.drawerSide.nativeElement,
        'animate__fadeInLeft'
      );
      this.renderer2.setStyle(
        this.drawerSide.nativeElement,
        'display',
        'initial'
      );
    }
  }

  private breakPoints() {
    this.breakpointObserver
      .observe('(max-width: 1023px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches && this.drawerSide?.nativeElement) {
          this.renderer2.removeClass(
            this.drawerSide.nativeElement,
            'animate__fadeInLeft'
          );
          this.renderer2.addClass(
            this.drawerSide.nativeElement,
            'animate__fadeOutLeft'
          );
          setTimeout(() => {
            this.renderer2.removeClass(
              this.drawerSide.nativeElement,
              'animate__fadeOutLeft'
            );
          }, 250);
        }
      });

    this.breakpointObserver
      .observe('(min-width: 1024px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches && this.drawerSide?.nativeElement) {
          this.renderer2.removeClass(
            this.drawerSide.nativeElement,
            'animate__fadeOutLeft'
          );
          this.renderer2.addClass(
            this.drawerSide.nativeElement,
            'animate__fadeInLeft'
          );
        }
      });
  }
}
