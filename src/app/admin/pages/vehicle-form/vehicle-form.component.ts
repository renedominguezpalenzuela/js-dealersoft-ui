import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  Renderer2,
  Input
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car, Customer, FilterDeepOption } from '@core/interfaces';
import { ApiHelperService, AuthService, RequestService } from '@core/services';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { FilterOperator } from '@core/interfaces/query-params';
import { timer } from 'rxjs';



@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VehicleFormComponent implements OnInit, OnDestroy {
  public car!: Car;
  public tabIndex: number = 0;
  public carsOptions: Car[] = [];
  public clientsOptions: Customer[] = [];
  private currentUserId: number | undefined;
 public can_save:  boolean = false;
 //public boton_salvar_disabled: Boolean | undefined;



  public existeCompraconA25: boolean = false;



  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly authService: AuthService,
    private renderer: Renderer2,
    
  ) {

    // console.log("Local Storage in Constructor")
    // console.log(localStorage.getItem('can_save'))
    // if (localStorage.getItem('can_save')==='true') {
    //   this.can_save = true;
    // } else {
    //   this.can_save = false;
    // }
    
    
  }


  ngOnDestroy(): void {
    localStorage.removeItem('firstTime') 
   // localStorage.removeItem('can_save') 
  }

  ngOnInit(): void {


    // console.log("Local Storage in nGInit")
    // console.log(localStorage.getItem('can_save'))
    // if (localStorage.getItem('can_save')==='true' ||  localStorage.getItem('can_save')===undefined) {
    //   this.can_save = true;
    // } else {
    //   this.can_save = false;
    // }
    




    this.authService.currentUser.subscribe(
      (user) => (this.currentUserId = user?.id)
    );

  
    this.activatedRoute.params.subscribe((params: Params) =>
      this.requestService
        .Get(`${this.apiHelperService.carsURL}/${params['id']}`)
        .subscribe((res) => {
          this.car = res.data;

          this.can_save = this.car.attributes.can_save;
          
    
        })
    );

    
    this.activatedRoute.queryParams.subscribe(
      (query: Params) => (this.tabIndex = +query['tab'] - 1)
    );
    this.requestService
      .Get(this.apiHelperService.carsURL, this.query())
      .subscribe((res) => {
        this.carsOptions = res.data;
      });

    // this.requestService.Get(this.apiHelperService.clientsURL).subscribe(res => this.clientsOptions = res.data);

    this.requestService
      .Get(
        this.apiHelperService.clientsURL,
        this.queryClients(this.currentUserId)
      )
      .subscribe((res) => {
        this.clientsOptions = res.data;
      });
  }

  private queryClients = (id: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[user][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  private queryBuyedCars = (car: any) =>
    this.requestService.generateQuery({
      populate: ['*'],
      filters: [
        {
          field: '[car][id]',
          value: car,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  // @ViewChild('tabs_invoice_contract') tabGroup!: MatTabGroup;

  // @ViewChild("tab_invoice", { static: true }) tabGroup!: MatTabGroup;

  public updateQueryParams = ($event: MatTabChangeEvent) => {
    //Activar el ink-bar del tab de invoice_number y contrato

    // console.log("Local Storage in TAB")
    // console.log(localStorage.getItem('can_save'))
    // if (localStorage.getItem('can_save')==='true' ||  localStorage.getItem('can_save')===undefined) {
    //   this.can_save = true;
    // } else {
    //   this.can_save = false;
    // }

    //Cada ves que cambi de TAB actualiza el estado de can_Save

    this.activatedRoute.params.subscribe((params: Params) =>
    this.requestService
      .Get(`${this.apiHelperService.carsURL}/${params['id']}`)
      .subscribe((res) => {
        this.car = res.data;

        this.can_save = this.car.attributes.can_save;
        
  
      })
  );
    

    if ($event.index == 2) {
      this.existeCompraconA25 = false;

      if (!localStorage.getItem('firstTime')) { 
        localStorage.setItem('firstTime', 'no reload') 
        let reloj = timer(550);
        reloj.subscribe((t) => {
          
         // window.location.reload();
        });      
       }

      this.requestService
        .Get(this.apiHelperService.carsBuyURL, this.queryBuyedCars(this.car.id))
        .subscribe((res) => {
          let datos = res.data;
          if (datos[0]?.attributes.a25) this.existeCompraconA25 = true;
          this.router.navigate(
            [{ existeCompraConA25: this.existeCompraconA25 }],
            {
              relativeTo: this.activatedRoute,
              queryParams: { tab: $event.index + 1 },
              queryParamsHandling: 'merge',
            }
          );
        });
    } else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: $event.index + 1 },
        queryParamsHandling: 'merge',
      });
    }
  };

  private query = () =>
    this.requestService.generateQuery({
      filters: [
        {
          field: '[owner][id]',
          operator: FilterOperator.$eq,
          value: <number>this.currentUserId,
          option: FilterDeepOption.$and,
        },
      ],
    });
}
