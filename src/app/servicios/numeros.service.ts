import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumerosService {

  constructor() { }


  //Convierte formato americano a formato aleman con dos valores decimales
  // 234.4  ---  234,34
  public createGermmanNumber(numero:any):string {

    //  let str = parseFloat(numero).toFixed(this.total_decimales);
    var formatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 });    
      var strvalue =formatter.format(numero)
      return strvalue
    }
  
    public eliminarComma(numero:any) {
      let strNumero = numero.replace(/,/g, '.');
      return strNumero
    }
  
    //convierte cadena formato aleman a formtao americano
    // 234,34 --- 234.4
  
    public  parseGermanNumber(number: any) {
      number = number.split('.').join('_').split(',').join('.').split('_').join(',')
      return parseFloat(number);
    }
}
