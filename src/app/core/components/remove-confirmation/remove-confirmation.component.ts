import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.scss']
})
export class RemoveConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private readonly dialogRef: MatDialogRef<RemoveConfirmationComponent>) {
  }

  ngOnInit(): void {
  }

  public close = () => this.dialogRef.close(false);

  public confirm = () => this.dialogRef.close(true);

}
