import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'saveDom3'
})
export class SaveDom3Pipe implements PipeTransform {


  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

}
