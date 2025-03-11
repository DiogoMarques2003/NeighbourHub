import { v4 as uuid } from 'uuid';

export default class Addresses {
  public readonly id: string;
  public country: string;
  public city: string;
  public street: string;
  public houseNumber: string;
  public postalCode: string;
  public houseType: number;
  public userId: string;
  public coundominiumId: string;

  constructor(props: Omit<Addresses, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
