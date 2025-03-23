export default interface ICommonAreasCreateDTO {
    id: string;
    status: string;
    userId: string;
    name: string;
    cost: number;
    rules: string;
    capacity: number;
    type: number;
    imagesAdd: Express.Multer.File[];
    imagesRemove: string[];
    condominiumId: string;
    endSchedule: string;
    startSchedule: string;
  }
  