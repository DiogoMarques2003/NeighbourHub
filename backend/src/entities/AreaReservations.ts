import { v4 as uuid } from 'uuid';

export default class AreaReservations {
  public readonly id: string;
  public startDate: Date;
  public endDate: Date;
  public status: string;
  public areaId: string;
  public userId: string;

  constructor(props: Omit<AreaReservations, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
