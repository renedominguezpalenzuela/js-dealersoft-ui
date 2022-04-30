import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '@core/interfaces';

@Component({
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<CustomerInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Customer) {
  }

  get address(): string {
    let { street, house_number, city, country } = this.data.attributes;
    street = !!street ? `${ street }, ` : '';
    const house = !!house_number ? `${ house_number }, ` : '';
    city = !!city ? `${ city }, ` : '';
    country = !!country ? `${ country } ` : '';
    return `${ street }${ house }${ city }${ country }` ?? '...';
  }

  ngOnInit(): void {
  }

  public close = () => this.dialogRef.close(false);

  public cleanUrl = (url: string) => {
    if (url.startsWith('https://')) return url.replace('https://', '');
    if (url.startsWith('http://')) return url.replace('http://', '');
    return url;
  }

}
