import { v4 as uuid } from 'uuid';

export default class CommonAreas {
  public readonly id: string;
  public name: string;
  public startSchedule: String;
  public endSchedule: String;
  public cost?: number;
  public rules: string;
  public status: string;
  public capacity: number;
  public images: string[];
  public type: number;
  public readonly createdAT: Date;
  public condominiumId: string;

  constructor(props: Omit<CommonAreas, 'id' | 'createdAT'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
