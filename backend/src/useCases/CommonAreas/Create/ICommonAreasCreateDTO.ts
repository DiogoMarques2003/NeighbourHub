export default interface ICommonAreasCreateDTO {
  userId: string;
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
