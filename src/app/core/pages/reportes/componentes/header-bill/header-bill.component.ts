import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-bill',
  templateUrl: './header-bill.component.html',
  styleUrls: ['./header-bill.component.scss']
})
export class HeaderBillComponent implements OnInit {

  @Input() me: any;
  @Input() client: any;
  @Input() imgPath: any;
  constructor() { }

  ngOnInit(): void {
  }

}
