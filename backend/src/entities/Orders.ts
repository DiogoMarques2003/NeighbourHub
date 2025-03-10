import { v4 as uuid } from 'uuid';
import Users from './Users';
import Condominiums from './Condominiums';
import OrderWorks from './OrderWorks';
import Votings from './Votings';
import Budgets from './Budgets';

export default class Orders {
  public readonly id: string;
  public description: string;
  public createdAt: Date;
  public urgency: string;
  public status: string;
  public lastOrder?: string;
  public deadline: Date;
  public userId: string;
  public condominiumId: string;
  public readonly user: Users;
  public readonly condominium: Condominiums;

  public readonly Budgets: Budgets[];
  public readonly Votings: Votings[];
  public readonly OrderWorks: OrderWorks[];

  constructor(props: Omit<Orders, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
