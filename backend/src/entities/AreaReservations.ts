import { v4 as uuid } from 'uuid';
import CommonAreas from './CommonAreas';
import Users from './Users';
import CondominiumPayments from './CondominiumPayments';
import Fine from './Fine';

export default class AreaReservations {
  public readonly id: string;
  public startDate: Date;
  public endDate: Date;
  public status: string;
  public areaId: string;
  public userId: string;
  public readonly area: CommonAreas;
  public readonly user: Users;

  public readonly CondominiumPayment: CondominiumPayments[];
  public readonly Fine: Fine[];

  constructor(props: Omit<AreaReservations, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
