import { v4 as uuid } from 'uuid';

export default class Orders {
  public readonly id: string;
  public description: string;
  public createdAt: Date;
  public urgency: string;
  public status: string;
  public lastOrder?: string;
  public startDate: Date;
  public endDate: Date;
  public userId: string;
  public condominiumId: string;

  constructor(props: Omit<Orders, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
