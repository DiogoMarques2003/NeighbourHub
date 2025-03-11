import { v4 as uuid } from 'uuid';

export default class CondominiumPayments {
  public readonly id: string;
  public value: number;
  public date: Date;
  public paymentType: number;
  public addressId: string;
  public areaReservationId?: string;

  constructor(props: Omit<CondominiumPayments, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
