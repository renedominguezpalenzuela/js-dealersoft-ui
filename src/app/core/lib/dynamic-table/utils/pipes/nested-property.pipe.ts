import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nestedProperty' })
export class NestedPropertyPipe implements PipeTransform {

  transform(value: any, properties: string): any {
    if (!!value) {
      let tempProperties = properties.split('.');
      let output = value;
      if (tempProperties.length === 1) {
        return value[properties];
      } else {
        tempProperties.forEach(prop => {
          if (output !== null && output !== undefined && output[prop] !== null && output[prop] !== undefined) {
            output = output[prop];
          } else {
            output = null;
          }
        });
        return output;
      }
    }
    return '';
  }

}
