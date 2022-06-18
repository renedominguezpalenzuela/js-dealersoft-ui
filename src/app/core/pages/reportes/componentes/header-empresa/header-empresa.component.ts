import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-header-empresa',
  templateUrl: './header-empresa.component.html',
  styleUrls: ['./header-empresa.component.scss']
})
export class HeaderEmpresaComponent implements OnInit {

  @Input() me:any;  
  @Input() car_buy_data:any;  
  @Input() imgPath:any;  

  constructor() { }

  ngOnInit(): void {
  }

}
