import { v4 as uuid } from 'uuid';
import Users from './Users';
import Orders from './Orders';
import Services from './Services';
import CommonAreas from './CommonAreas';
import Addresses from './Addresses';

export default class Condominiums {
  public readonly id: string;
  public name: string;
  public mountlyQuota: number;
  public adminId: string;
  public admin: Users;

  public readonly Addresses: Addresses[];
  public readonly CommonAreas: CommonAreas[];
  public readonly Services: Services[];
  public readonly Orders: Orders[];

  constructor(props: Omit<Condominiums, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
