import { v4 as uuid } from 'uuid';

export default class Users {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public phoneNumber: string;
  public iban: string;
  public foto?: string;

  constructor(props: Omit<Users, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
