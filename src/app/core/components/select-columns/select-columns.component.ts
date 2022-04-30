import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Column } from '@core/lib/dynamic-table/utils/interfaces';

@Component({
  templateUrl: './select-columns.component.html',
  styleUrls: ['./select-columns.component.scss']
})
export class SelectColumnsComponent implements OnInit {

  public selectedValues: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { columns: Column[] },
              private readonly dialogRef: MatDialogRef<SelectColumnsComponent>) {
    this.selectedValues = this.data.columns.filter(col => col.show).map(col => col.column);
  }

  ngOnInit(): void {
  }

  public close = () => this.dialogRef.close(false);

  public updateData = () => this.dialogRef.close(this.data);
}
