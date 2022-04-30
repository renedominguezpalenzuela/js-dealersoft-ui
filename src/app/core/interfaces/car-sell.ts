import { Car } from './car';
import { Customer } from './customer';

export interface CarSell {
  id: string,
  attributes: {
    invoice_number: string,
    invoice_date: Date,
    kv_date: Date,
    client: { data: Customer },
    car: { data: Car },
    net_sell: number,
    iva_sell: number,
    gross_sell: number,
    a25: boolean,
    iva: boolean,
    export: boolean,
    createdAt: Date,
  }
}
