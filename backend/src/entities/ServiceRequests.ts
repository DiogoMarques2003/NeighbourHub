import { v4 as uuid } from 'uuid';
import Users from './Users';
import Services from './Services';
import ServiceReviews from './ServiceReviews';

export default class ServiceRequests {
  public readonly id: string;
  public requestDate: Date;
  public status: string;
  public serviceId: string;
  public userId: string;
  public readonly service: Services;
  public readonly user: Users;

  public readonly ServiceReview: ServiceReviews[];

  constructor(props: Omit<ServiceRequests, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
