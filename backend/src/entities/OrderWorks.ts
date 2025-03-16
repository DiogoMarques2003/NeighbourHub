import { v4 as uuid } from 'uuid';

export default class OrderWorks {
  public readonly id: string;
  public postedAt: Date;
  public status: string;
  public description: string;
  public orderId: string;

  constructor(props: Omit<OrderWorks, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
