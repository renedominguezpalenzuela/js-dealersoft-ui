export interface Customer {
  id: string,
  attributes: {
    first_name: string,
    last_name: string,
    birth_date: Date,
    phone: string,
    fax: string,
    website: string,
    street: string,
    house_number: number,
    postal_code: number,
    city: string,
    country: string,
    aditional_address: string,
    tax_number: number,
    email: string,
    title: string
  }
}
