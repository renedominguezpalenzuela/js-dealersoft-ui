import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { color: string, data: string | string[] },
    private readonly snackRef: MatSnackBarRef<NotificationComponent>
  ) {
  }

  ngOnInit(): void {
  }

  closeSnack = () => this.snackRef.dismiss();

  public isString = () => this.data.data === this.data.data.toString();

  public getArray = () => this.data.data as Array<string>;

  public getClass = () => `alert shadow-lg ${ this.data.color }`;

}
