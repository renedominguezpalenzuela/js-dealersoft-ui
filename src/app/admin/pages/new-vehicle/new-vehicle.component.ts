import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiHelperService, AuthService, NotificationService, RequestService, ValidationsService } from '@core/services';
import { Router } from '@angular/router';
import { Car } from '@core/interfaces';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { Inject} from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/de';

// import 'moment/locale/de-at';


import { Globals } from '../../../globales';






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
  styleUrls: ['./new-vehicle.component.scss'],
  providers: [

    Globals,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.

    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
   // { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

   {
    provide: MAT_DATE_FORMATS, useValue: {
        parse: {
            dateInput: "L",
        },
        display: {
            dateInput: "L",
            monthYearLabel: "MMM YYYY",
            dateA11yLabel: "LL",
            monthYearA11yLabel: "MMMM YYYY",
        },
    }
}
    
  ]


})
export class NewVehicleComponent implements OnInit, OnChanges , AfterViewInit{

  totalAusstattung = 4;

  @Input() public boton_salvar_disabled!:  boolean | undefined;

  public vehicleForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    car_identifier: [null, [Validators.required]],
    build_variant: [null, [Validators.required]],
    first_register_date: [null, [Validators.required]],
    kilometres: [null, [Validators.required, Validators.min(0)]],
    kilowatt: [null, [Validators.min(0)]],
    color: [null ],
    last_owner: [null ],
    hsn: [null],
    tsn: [null],
    source: [null],
    owner: [null, [Validators.required]],
  });


  @Input() public car: Car | undefined;



  public options: { label: string, value: string }[] = environment.sourcesOptions;
  public comments: string[] = [];
  public currentComment: string = '';
  public commentsError: boolean = false;
  public isUpdating: boolean = false;
  
  public imgSrcList: ImgSrc[] = [];
  public currentImgSrc: ImgSrc | undefined;
  public toDelete: number[] = [];

  public texto_label: any="Ausstattung #1";
  public input_read_only: boolean=false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly router: Router,
    private readonly validationsService: ValidationsService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private globales: Globals

  ) {
   
   

  
  }


  desHabilitarControles() {
    for (const field in this.vehicleForm.controls) { // 'field' is a string
      this.vehicleForm.controls[field].disable();
    }
	}

  
  habilitarControles() {
    for (const field in this.vehicleForm.controls) { // 'field' is a string
      this.vehicleForm.controls[field].enable();
    }
  }




  ngAfterViewInit(): void { 

   

    
  }

  ngOnChanges(changes: SimpleChanges): void {



    // this.boton_salvar_disabled=true;
   if (this.car?.attributes.can_save===true) {

    
    //this.boton_salvar_disabled=false;
    this.habilitarControles()
    if (this.comments.length < 4) {
      this.input_read_only = false;
    }
    
   } else { 
    //this.boton_salvar_disabled=true; 
    this.desHabilitarControles()
    this.input_read_only = true;
   }

   if ( this.boton_salvar_disabled===true ) {
    this.desHabilitarControles()
    this.input_read_only = true;
   } else {
    if (this.comments.length < 4) {
      this.input_read_only = false;
    }
   }


   



  
    if (changes?.['car']?.currentValue) {

      //Verificar si se puede editar el carro si campo can_save = true (si se presiona martillo can_save=false)

    
     
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

    this._locale = 'de';
    this._adapter.setLocale(this._locale);

   
    

    
  }

  public submit() {



    if (this.vehicleForm.valid && this.comments.length > 0) {
      //Se adicionan los comentarios al formulario
    const  formValue = {
        ...this.vehicleForm.value,
        comments: this.comments,
      };

     




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
                    //Vehicle updated successfully
                    //Fahrzeug erfolgreich aktualisiert
                    this.notificationService.riseNotification({
                      color: 'success',
                      data: 'gespeichert'
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
                //Vehicle updated successfully
                //Fahrzeug erfolgreich aktualisiert
                //
                this.notificationService.riseNotification({
                  color: 'success',
                  data: 'gespeichert'
                });
              });
            });
        }
      } else {

        //Stored new car
        //Neuwagen eingelagert
        const subscription = () => {
          this.notificationService.riseNotification({ color: 'success', data: 'gespeichert' });
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
     
    } else if (this.comments.length === 0) {
      this.commentsError = true;
      
    }
  }


  public addComment = () => {

   

    

    if (this.comments.length < 4) {
      

      if (this.currentComment) {
        this.comments.push(this.currentComment);
        this.currentComment = '';
        this.commentsError = false;
        this.input_read_only = false;
        let numero_comentario = this.comments.length + 1;

         if (numero_comentario<=4) {
            this.texto_label = 'Ausstattung #' + numero_comentario.toString();
         } else {
           this.input_read_only = true;
           this.texto_label = 'keine weiteren Ausstattungen möglich';
         }
        // this.totalAusstattung=this.totalAusstattung-1;
      }
    } else {
      this.input_read_only = true;
      
      this.texto_label = 'keine weiteren Ausstattungen möglich';
      this.currentComment = '';
    }
  };

  public removeComment = (i: number) => {
  
    this.comments.splice(i, 1);

    let numero_comentario = this.comments.length + 1;

    if (numero_comentario<=4) {
      this.texto_label = 'Ausstattung #' + numero_comentario.toString();
      this.input_read_only = false;
    }


  }


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
