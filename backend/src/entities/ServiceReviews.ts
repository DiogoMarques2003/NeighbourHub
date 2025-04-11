import { v4 as uuid } from 'uuid';

export default class ServiceReviews {
  public readonly id: string;
  public rating: number;
  public comment: string;
  public createdAt: Date;
  public serviceRequestId: string;

  constructor(props: Omit<ServiceReviews, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
