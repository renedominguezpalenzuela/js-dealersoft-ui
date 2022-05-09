import { Car } from './car';
import { Customer } from './customer';

export interface CarBuy {
  id: string,
  attributes: {
    car: { data: Car },
    client: { data: Customer },
    observation_1: string,
    observation_2: string,
    collection: string,
    payment: string,
    net_buy: number,
    iva_buy: number,
    gross_buy: number,
    net_buy_adjustment: number,
    year_interest_rate: number,
    total: number,
    buy_date: Date,
    a25: boolean,
    iva: boolean,
    bemerkunhen: string,
    createdAt: Date,
  }
}
