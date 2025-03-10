import { v4 as uuid } from 'uuid';
import Votings from './Votings';
import Orders from './Orders';
import Addresses from './Addresses';
import Condominiums from './Condominiums';
import AreaReservations from './AreaReservations';
import Services from './Services';
import ServiceRequests from './ServiceRequests';

export default class Users {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public phoneNumber: string;
  public iban: string;
  public foto?: string;

  public readonly Addresses: Addresses[];
  public readonly Condominiums: Condominiums[];
  public readonly AreaReservations: AreaReservations[];
  public readonly Services: Services[];
  public readonly ServiceRequests: ServiceRequests[];
  public readonly Orders: Orders[];
  public readonly Votings: Votings[];

  constructor(props: Omit<Users, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
