import { v4 as uuid } from 'uuid';
import Users from './Users';
import Condominiums from './Condominiums';
import ServiceRequests from './ServiceRequests';

export default class Services {
  public readonly id: string;
  public name: string;
  public description: string;
  public cost?: number;
  public ownerId: string;
  public condominiumId: string;
  public readonly owner: Users;
  public readonly condominium: Condominiums;

  public readonly ServiceRequests: ServiceRequests[];

  constructor(props: Omit<Services, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
