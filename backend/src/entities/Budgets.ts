import { v4 as uuid } from 'uuid';
import Orders from './Orders';
import Votings from './Votings';

export default class Budgets {
  public readonly id: string;
  public description: string;
  public amount: number;
  public createdAt: Date;
  public orderId: string;
  public readonly order: Orders;

  public readonly Votings: Votings[];

  constructor(props: Omit<Budgets, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
