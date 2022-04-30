import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '@core/interfaces';

@Component({
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.scss']
})
export class InvoiceInfoComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<InvoiceInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Invoice) {
  }

  get client(): string {
    if (this.data.attributes.client?.data?.attributes) {
      const title = this.data.attributes.client?.data?.attributes?.title ?? '';
      const first_name = this.data.attributes.client?.data?.attributes?.first_name ?? '';
      const last_name = this.data.attributes.client?.data?.attributes?.last_name ?? '';
      return `${ title } ${ first_name } ${ last_name }`;
    } else return '---';
  }

  ngOnInit(): void {
  }

  public close = () => this.dialogRef.close(false);

}
