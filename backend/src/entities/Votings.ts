import { v4 as uuid } from 'uuid';
import Orders from './Orders';
import Budgets from './Budgets';
import Users from './Users';

export default class Votings {
  public readonly id: string;
  public decision: boolean;
  public orderID: string;
  public budgetID?: string;
  public userID: string;
  public readonly order: Orders;
  public readonly budget?: Budgets;
  public readonly user: Users;

  constructor(props: Omit<Votings, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
