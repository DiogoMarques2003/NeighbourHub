export default interface ICreateOrdersWorkDTO {
  status: string;
  description: string;
  reportFile?: Express.Multer.File;
  orderId: string;
  userId: string;
  condominiumId: string;
}
