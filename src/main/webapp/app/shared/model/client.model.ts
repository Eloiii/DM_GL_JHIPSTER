import { IOrder } from '@/shared/model/order.model';

export interface IClient {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  orders?: IOrder[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public phone?: string,
    public address?: string,
    public orders?: IOrder[] | null
  ) {}
}
