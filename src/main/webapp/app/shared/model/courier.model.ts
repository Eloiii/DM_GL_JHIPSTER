import { IOrder } from '@/shared/model/order.model';

export interface ICourier {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  vehicle?: string;
  order?: IOrder | null;
}

export class Courier implements ICourier {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public phone?: string,
    public vehicle?: string,
    public order?: IOrder | null
  ) {}
}
