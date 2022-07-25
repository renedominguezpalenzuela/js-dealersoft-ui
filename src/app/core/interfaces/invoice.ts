import { Customer } from './customer';

export interface Invoice {
  id: string,
  attributes: {
    invoice_number: string,
    cancel_invoice_number: string,
    reference_invoice_number:string,
    title: string,
    description: string,
    date: Date,
    delivery_date: Date,
    client: { data: Customer },
    a25: boolean,
    iva: boolean,
    places: { article: string, quantity: number, unit_price: number }[],
    createdAt: string
  }
}
