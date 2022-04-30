import { Image } from '@core/interfaces/image';
import { User } from '@core/interfaces/user';

export interface Logo {
  id: number,
  attributes: {
    logo: { data: Image },
    user?: { data: User }
    createdAt: Date,
    updatedAt: Date
  }
}
