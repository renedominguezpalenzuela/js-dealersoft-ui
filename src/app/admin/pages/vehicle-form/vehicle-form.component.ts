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

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => this.currentUserId = user?.id);
    this.activatedRoute.params.subscribe((params: Params) =>
      this.requestService.Get(`${ this.apiHelperService.carsURL }/${ params['id'] }`)
        .subscribe((res) =>{ 
          this.car = res.data
      
        })
    );
    this.activatedRoute.queryParams.subscribe((query: Params) => this.tabIndex = +query['tab'] - 1);
    this.requestService.Get(this.apiHelperService.carsURL, this.query()).subscribe(res => this.carsOptions = res.data);
    this.requestService.Get(this.apiHelperService.clientsURL).subscribe(res => this.clientsOptions = res.data);
  }

  public updateQueryParams = ($event: MatTabChangeEvent) => {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { tab: $event.index + 1 },
      queryParamsHandling: 'merge',
    });
  }

  private query = () => this.requestService.generateQuery({
    filters: [
      {
        field: '[owner][id]',
        operator: FilterOperator.$eq,
        value: <number>this.currentUserId,
        option: FilterDeepOption.$and
      }
    ]
  });

}
