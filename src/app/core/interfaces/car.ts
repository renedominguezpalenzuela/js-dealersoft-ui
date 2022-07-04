import { CarBuy } from '@core/interfaces/car-buy';
import { Image } from '@core/interfaces/image';
import { User } from '@core/interfaces/user';

export interface Car {
  id: string,
  attributes: {
    name: string,
    car_identifier: string,
    build_variant: string,
    first_register_date: Date,
    kilometres: number,
    kilowatt: number,
    color: string,
    last_owner: string,
    hsn: string,
    tsn: string,
    comments: any,
    selled: boolean,
    pictures: { data: Image[] },
    car_buy_data: { data: CarBuy },
    owner: User,
    can_save: boolean,
    a25: boolean,
    iva: boolean,

    sell: any
  }
}
