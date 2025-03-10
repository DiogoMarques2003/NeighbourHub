import { v4 as uuid } from 'uuid';
import Condominiums from './Condominiums';
import AreaReservations from './AreaReservations';

export default class CommonAreas {
  public readonly id: string;
  public name: string;
  public schedule: Date;
  public cost: number;
  public rules: string;
  public status: string;
  public capacity: number;
  public images: string[];
  public type: number;
  public condominiumId: string;
  public readonly condominium: Condominiums;

  public readonly AreaReservations: AreaReservations[];

  constructor(props: Omit<CommonAreas, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
