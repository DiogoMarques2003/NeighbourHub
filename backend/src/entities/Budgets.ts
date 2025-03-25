import { v4 as uuid } from 'uuid';

export default class Budgets {
  public readonly id: string;
  public description: string;
  public amount: number;
  public createdAt: Date;
  public orderId: string;

  constructor(props: Omit<Budgets, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
