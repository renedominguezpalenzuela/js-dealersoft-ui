import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '@core/interfaces';
import { ApiHelperService } from '@core/services';

@Component({
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.scss']
})
export class VehicleInfoComponent implements OnInit {

  public imgSrcList: { index: number, url: string, alt: string }[] = [];
  public currentImgSrc: { index: number, url: string, alt: string } | undefined;

  constructor(private readonly dialogRef: MatDialogRef<VehicleInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Car,
              private readonly apiHelperService: ApiHelperService) {
  }

  ngOnInit(): void {
    if (this.data.attributes.pictures.data) {
      this.imgSrcList = this.data.attributes.pictures.data.map((pic, index) => ({
        index,
        url: `${ this.apiHelperService.hostUrl }${ pic.attributes.url }`,
        alt: pic.attributes.alternativeText
      }));
      this.currentImgSrc = this.imgSrcList[0];
    }
  }

  public close = () => this.dialogRef.close(false);

  public clearCurrentImg = () => this.currentImgSrc = undefined;

  public previewImg = (img: { index: number; url: string; alt: string }) => this.currentImgSrc = img;
}
