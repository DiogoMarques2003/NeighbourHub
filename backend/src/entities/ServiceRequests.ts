import { v4 as uuid } from 'uuid';

export default class ServiceRequests {
  public readonly id: string;
  public requestDate: Date;
  public status: string;
  public serviceId: string;
  public userId: string;

  constructor(props: Omit<ServiceRequests, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
