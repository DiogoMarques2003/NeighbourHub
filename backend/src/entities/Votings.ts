import { v4 as uuid } from 'uuid';

export default class Votings {
  public readonly id: string;
  public decision: boolean;
  public orderID: string;
  public budgetID?: string;
  public userID: string;

  constructor(props: Omit<Votings, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
