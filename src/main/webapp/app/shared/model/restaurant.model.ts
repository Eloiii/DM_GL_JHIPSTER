import { IOrder } from '@/shared/model/order.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  email?: string | null;
  orders?: IOrder[] | null;
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public phone?: string,
    public email?: string | null,
    public orders?: IOrder[] | null
  ) {}
}
