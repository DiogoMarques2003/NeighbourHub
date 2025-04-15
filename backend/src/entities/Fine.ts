import { v4 as uuid } from 'uuid';

export default class Fine {
  public readonly id: string;
  public amount: number;
  public reason: string;
  public createdAt: Date;
  public status: string;
  public areaReservationId: string;

  constructor(props: Omit<Fine, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
