import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acordion',
  templateUrl: './acordion.component.html',
  styleUrls: ['./acordion.component.scss'],
})
export class AcordionComponent implements OnInit {
  public panelOpenState = false;
  public panelOpenState2 = false;
  public panelOpenState3 = false;
  public panelOpenState4 = false;
  public panelOpenState5 = false;
  constructor() {}

  ngOnInit(): void {}
}
