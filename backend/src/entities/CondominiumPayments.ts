import { v4 as uuid } from 'uuid';
import Addresses from './Addresses';
import AreaReservations from './AreaReservations';

export default class CondominiumPayments {
  public readonly id: string;
  public value: number;
  public date: Date;
  public paymentType: number;
  public addressId: string;
  public areaReservationId?: string;
  public readonly address: Addresses;
  public readonly areaReservation?: AreaReservations;

  constructor(props: Omit<CondominiumPayments, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
