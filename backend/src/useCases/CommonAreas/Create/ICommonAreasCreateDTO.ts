export default interface ICommonAreasCreateDTO {
  name: string;
  cost: number;
  rules: string;
  capacity: number;
  type: number;
  images: Express.Multer.File[];
  condominiumId: string;
  endSchedule: string;
  startSchedule: string;
}
