import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-car-details-supermin',
  templateUrl: './car-details-supermin.component.html',
  styleUrls: ['./car-details-supermin.component.scss']
})
export class CarDetailsSuperminComponent implements OnInit {

  @Input() car_info: any;
  constructor() { }

  ngOnInit(): void {
  }

}
