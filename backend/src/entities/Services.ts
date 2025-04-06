import { v4 as uuid } from 'uuid';

export default class Services {
  public readonly id: string;
  public name: string;
  public description: string;
  public cost?: number;
  public ownerId: string;
  public condominiumId: string;
  public readonly createdAt: Date;

  constructor(props: Omit<Services, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
