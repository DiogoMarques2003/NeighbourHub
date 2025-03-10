import { v4 as uuid } from 'uuid';
import ServiceRequests from './ServiceRequests';

export default class ServiceReviews {
  public readonly id: string;
  public rating: number;
  public comment: string;
  public createdAt: Date;
  public serviceRequestId: string;
  public readonly serviceRequest: ServiceRequests;

  constructor(props: Omit<ServiceReviews, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
