import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiHelperService, AuthService, NotificationService, RequestService, ValidationsService } from '@core/services';
import { Router } from '@angular/router';
import { Car } from '@core/interfaces';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';

declare interface ImgSrc {
  index: number,
  url: string,
  alt: string,
  file?: File,
  id?: number
}

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit, OnChanges {

  totalAusstattung = 4;

  public vehicleForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    car_identifier: [null, [Validators.required]],
    build_variant: [null, [Validators.required]],
    first_register_date: [null, [Validators.required]],
    kilometres: [null, [Validators.required, Validators.min(0)]],
    kilowatt: [null, [Validators.min(0)]],
    color: [null, [Validators.nullValidator]],
    last_owner: [null, [Validators.nullValidator]],
    hsn: ["", [Validators.nullValidator]],
    tsn: ["", [Validators.nullValidator]],
    source: [null],
    owner: [null, [Validators.required]],
  });
  public options: { label: string, value: string }[] = environment.sourcesOptions;
  public comments: string[] = [];
  public currentComment: string = '';
  public commentsError: boolean = false;
  public isUpdating: boolean = false;
  @Input() public car: Car | undefined;
  public imgSrcList: ImgSrc[] = [];
  public currentImgSrc: ImgSrc | undefined;
  public toDelete: number[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly router: Router,
    private readonly validationsService: ValidationsService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {

   

  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['car'].currentValue) {
      this.isUpdating = true;
      for (let key in this.vehicleForm.controls) {
        this.vehicleForm.get(key)!.clearValidators();
      }
      this.vehicleForm.updateValueAndValidity();
      this.vehicleForm.get('kilometres')!.addValidators([Validators.min(0)]);
      this.vehicleForm.get('kilowatt')!.addValidators([Validators.min(0)]);
      this.vehicleForm.patchValue(this.car!.attributes);
      this.comments = this.car!.attributes.comments;
      if (this.car!.attributes.pictures.data?.length > 0) {
        this.imgSrcList.push(...this.car!.attributes.pictures.data.map((pic, index) => ({
          index: this.imgSrcList.length + index + 1,
          url: `${ this.apiHelperService.hostUrl }${ pic.attributes.url }`,
          alt: pic.attributes.alternativeText,
          file: undefined,
          id: pic.id
        })));
        this.currentImgSrc = this.imgSrcList[0];
      }

    }

    
  }

  ngOnInit(): void {

  
    this.authService.currentUser.subscribe(user => this.vehicleForm.patchValue({ owner: user?.id }));

    
  }

  public submit() {
    if (this.vehicleForm.valid && this.comments.length > 0) {
      const formValue = { ...this.vehicleForm.value, comments: this.comments };
      if (this.isUpdating) {
        const files = this.imgSrcList.filter(elm => elm.file instanceof File);
        if (files.length > 0) {
          const form = new FormData();
          files.forEach(elm => form.append('files', <File>elm.file));
          this.requestService.POSTUpload(this.apiHelperService.uploadFilesURL, form).subscribe((events) => {
            if (events.type === HttpEventType.Response) {
              const fromBody = (events.body as Array<any>).map(elm => elm.id);
              const fromCar = this.car!.attributes.pictures.data?.length > 0 ?
                this.car?.attributes.pictures.data.map(elm => elm.id) : [];
              // @ts-ignore
              const pictures = files.length < this.imgSrcList.length ? [...fromCar, ...fromBody] : fromBody;
              const data = { ..._.omitBy(formValue, this.notValue), pictures };
              this.requestService.Put(`${ this.apiHelperService.carsURL }/${ this.car!.id }`, data)
                .subscribe((res: any) => {
                  if (this.toDelete.length > 0)
                    forkJoin(this.toDelete.map(elm => this.requestService.Delete(`${ this.apiHelperService.uploadFilesURL }/files/${ elm }`)))
                      .pipe().subscribe();
                  this.requestService.Get(`${ this.apiHelperService.carsURL }/${ this.car!.id }`).subscribe(resUpdate => {
                    this.car = resUpdate.data;
                    this.notificationService.riseNotification({
                      color: 'success',
                      data: 'Fahrzeug erfolgreich aktualisiert'
                    });
                  });
                });
            }
          });
        } else {
          const data = { ..._.omitBy(formValue, this.notValue), pictures: this.imgSrcList.map(elm => elm.id) };
          this.requestService.Put(`${ this.apiHelperService.carsURL }/${ this.car!.id }`, data)
            .subscribe((res: any) => {
              if (this.toDelete.length > 0)
                forkJoin(this.toDelete.map(elm => this.requestService.Delete(`${ this.apiHelperService.uploadFilesURL }/files/${ elm }`)))
                  .pipe().subscribe();
              this.requestService.Get(`${ this.apiHelperService.carsURL }/${ this.car!.id }`).subscribe(resUpdate => {
                this.car = resUpdate.data;
                this.notificationService.riseNotification({
                  color: 'success',
                  data: 'Fahrzeug erfolgreich aktualisiert'
                });
              });
            });
        }
      } else {
        const subscription = () => {
          this.notificationService.riseNotification({ color: 'success', data: 'Neuwagen eingelagert' });
          this.router.navigate(['/admin/all-vehicles']);
        }
        if (this.imgSrcList.length > 0) {
          const form = new FormData();
          this.imgSrcList.forEach(elm => form.append('files', <File>elm!.file));
          this.requestService.POSTUpload(this.apiHelperService.uploadFilesURL, form).subscribe((events) => {
            if (events.type === HttpEventType.Response) {
              const data = { ...formValue, pictures: (events.body as Array<any>).map(elm => elm.id) };
              this.requestService.Post(this.apiHelperService.carsURL, data).subscribe(() => subscription);
            }
          });
        } else { //Salvando nuevo carro
       
          this.requestService.Post(this.apiHelperService.carsURL, formValue).subscribe(subscription);
        }
      }
    } else if (this.comments.length === 0) this.commentsError = true;
  }

  public addComment = () => {

    
    if (this.comments.length<4) {
    if (this.currentComment) {
      this.comments.push(this.currentComment);
      this.currentComment = '';
      this.commentsError = false;
      // this.totalAusstattung=this.totalAusstattung-1;
    }
   }
  };

  public removeComment = (i: number) => this.comments.splice(i, 1);

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.vehicleForm, input);
  };

  public isRequired = (): boolean => !this.isUpdating;

  public previewImages($event: any) {
    const files: File[] = Array.from($event.target.files);
    this.imgSrcList.push(...files.map((file, index) => ({
      index: this.imgSrcList.length + index + 1,
      url: window.URL.createObjectURL(file),
      alt: file.name,
      file
    })));
    if (!this.currentImgSrc) this.currentImgSrc = this.imgSrcList[0];
  }

  public removeImg(i: number, img: ImgSrc) {
    if (this.currentImgSrc === img) this.currentImgSrc = undefined;
    if (this.isUpdating && !!img.id) this.toDelete.push(img.id);
    this.imgSrcList.splice(i, 1);
  }

  public clearCurrentImg = () => {
    const pos = this.imgSrcList.findIndex(elm => elm.index === this.currentImgSrc?.index);
    if (pos >= 0) this.imgSrcList.splice(pos, 1);
    this.currentImgSrc = undefined;
  };

  public previewImg = (img: ImgSrc) => this.currentImgSrc = img;

  private notValue = (value: any) => _.isNil(value) || value === '';


}
