import { v4 as uuid } from 'uuid';

export default class Condominiums {
  public readonly id: string;
  public name: string;
  public mountlyQuota: number;
  public adminId: string;

  constructor(props: Omit<Condominiums, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
