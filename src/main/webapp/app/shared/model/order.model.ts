import { ICourier } from '@/shared/model/courier.model';
import { IClient } from '@/shared/model/client.model';
import { IRestaurant } from '@/shared/model/restaurant.model';

export interface IOrder {
  id?: number;
  address?: string;
  price?: number;
  status?: string;
  courier?: ICourier | null;
  client?: IClient | null;
  restaurant?: IRestaurant | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public address?: string,
    public price?: number,
    public status?: string,
    public courier?: ICourier | null,
    public client?: IClient | null,
    public restaurant?: IRestaurant | null
  ) {}
}
