import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculosService {
  public factorIva: number = 0.19;

  constructor() {}

  //Convierte formato americano a formato aleman con dos valores decimales
  // 234.4  ---  234,34
  public createGermmanNumber(numero: any) {

   
    if (!numero) return null;
   


    
    //  let str = parseFloat(numero).toFixed(this.total_decimales);
    var formatter = new Intl.NumberFormat('de-DE', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    var strvalue = formatter.format(numero);

    
   
    return strvalue;
  }

  public eliminarComma(numero: any) {
    let strNumero = numero.replace(/,/g, '.');
    return strNumero;
  }

  //convierte cadena formato aleman a formtao americano
  //convierte cualquier tipo de numero (string, number) a formato americano string
  // 234,34 --- 234.4
  // 1.234,56
  // 1,234.56
  // 1,00
  // 1.00
  //CASOS
  // 1) contiene una sola coma 1,00 y no contiene  punto ---> numero aleman
  // 2) contiene un solo punto 1.00 y no contiene  coma ---> numero usa
  // 3) contiene punto y coma 1.000,00 y la coma esta despues ---> numero aleman
  // 3) contiene punto y coma 1,000.00 y la punto esta despues ---> numero usa

  is_german_number(numero: any): boolean {
    let has_punto = false;
    let has_comma = false;
    let coma_before_punto = false;

    let usa_number = false;
    let ger_number = false;

 

    let pos_coma = numero.indexOf(',');
    let pos_punto = numero.indexOf('.');

    // 1) contiene una sola coma 1,00 y no contiene  punto ---> numero aleman
    if (pos_coma >= 0 && pos_punto < 0) {
      return true;
    }

    // 2) contiene un solo punto 1.00 y no contiene  coma ---> numero usa
    if (pos_coma < 0 && pos_punto >= 0) {
      return false;
    }

    if (pos_coma >= 0 && pos_punto >= 0) {
      // 3) contiene punto y coma 1.000,00 y la coma esta despues ---> numero aleman
      if (pos_coma > pos_punto) {
        return true;
      } else {
        // 3) contiene punto y coma 1,000.00 y la punto esta despues ---> numero usa
        return false;
      }
    }

    return false;
  }

  public parseGermanNumber(number: any): number {
    if (number === null || number === 0) {
      return 0;
    }

  
    if (typeof number === 'string') {
      if (this.is_german_number(number)) {
        number = number
          .split('.')
          .join('_')
          .split(',')
          .join('.')
          .split('_')
          .join(',');
       
        return parseFloat(number);
      } else {
      
        return parseFloat(number);
      }
    } else {
      return number;
    }
  }

  public calcularIVA(
    vNet_value: number,
    vGross_value: number,
    vIva_value: number
  ) {
    let vNet = vNet_value;
    let vGross = vGross_value;
    let vIva = vIva_value;

    //const value: number = this.numeros.parseGermanNumber(this.carBuyForm.get('net_buy')!.value);

    // let vNet_buy: number =Number(this.numeros.parseGermanNumber(this.carBuyForm.get('net_buy')!.value));
    // let vGross_buy: number =Number(this.numeros.parseGermanNumber(this.carBuyForm.get('gross_buy')!.value));
    // let vIva: number = Number(this.numeros.parseGermanNumber(this.carBuyForm.get('iva')!.value));

    if (vNet != null && vNet != 0) {
      vIva = vNet * this.factorIva;
      vGross = vNet + vIva;
    
    } else {
      if (vGross != null && vGross != 0) {
        vNet = vGross / (1 + this.factorIva);
        vIva = vGross - vNet;

       
      }
    }

    let respuesta = {
      net: vNet,
      gross: vGross,
      iva: vIva,
    };

    return respuesta;
  }
}
