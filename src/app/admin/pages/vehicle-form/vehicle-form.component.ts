import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car, Customer, FilterDeepOption } from '@core/interfaces';
import { ApiHelperService, AuthService, RequestService } from '@core/services';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FilterOperator } from '@core/interfaces/query-params';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleFormComponent implements OnInit {
  public car!: Car;
  public tabIndex: number = 0;
  public carsOptions: Car[] = [];
  public clientsOptions: Customer[] = [];
  private currentUserId: number | undefined;

  public existeCompraconA25: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly authService: AuthService,
    
  
  ) {


    // console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  ngOnInit(): void {

    

    this.authService.currentUser.subscribe(
      (user) => (this.currentUserId = user?.id)
    );
    this.activatedRoute.params.subscribe((params: Params) =>
      this.requestService
        .Get(`${this.apiHelperService.carsURL}/${params['id']}`)
        .subscribe((res) => {
          this.car = res.data;
        
         
        })
    );
    this.activatedRoute.queryParams.subscribe(
      (query: Params) => (this.tabIndex = +query['tab'] - 1)
    );
    this.requestService
      .Get(this.apiHelperService.carsURL, this.query())
      .subscribe((res) => {
            this.carsOptions = res.data

          
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

  public updateQueryParams = ($event: MatTabChangeEvent) => {
 

    if ($event.index == 2) {
      this.existeCompraconA25 = false;

      this.requestService
        .Get(
          this.apiHelperService.carsBuyURL,
          this.queryBuyedCars(this.car.id)
        )
        .subscribe((res) => {
          let datos = res.data;


          if (datos[0].attributes.a25)   this.existeCompraconA25 = true;

        

     
          this.router.navigate([{existeCompraConA25: this.existeCompraconA25}], {
            relativeTo: this.activatedRoute,
            queryParams: { tab: $event.index + 1 },
            queryParamsHandling: 'merge'
          });

         

        });

    
    } else {
    
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { tab: $event.index + 1 },
      queryParamsHandling: 'merge'
      
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
