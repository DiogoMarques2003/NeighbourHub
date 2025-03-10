import { v4 as uuid } from 'uuid';
import Users from './Users';
import Condominiums from './Condominiums';
import CondominiumPayments from './CondominiumPayments';

export default class Addresses {
  public readonly id: string;
  public country: string;
  public city: string;
  public houseNumber: string;
  public postalCode: string;
  public houseType: string;
  public userId: string;
  public coundominiumId: string;
  public readonly user: Users;
  public readonly coundominium: Condominiums;

  public readonly CondominiumPayment: CondominiumPayments[];

  constructor(props: Omit<Addresses, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
