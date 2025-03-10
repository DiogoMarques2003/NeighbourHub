import { v4 as uuid } from 'uuid';
import Orders from './Orders';

export default class OrderWorks {
  public readonly id: string;
  public startDate: Date;
  public endDate: Date;
  public status: string;
  public description: string;
  public orderId: string;
  public readonly order: Orders;

  constructor(props: Omit<OrderWorks, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
