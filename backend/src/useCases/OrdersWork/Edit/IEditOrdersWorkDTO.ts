export default interface IEditOrdersWorkDTO {
  condominiumId: string;
  orderId: string;
  orderWorkId: string;
  deleteReportFile: Boolean;
  reportFile: Express.Multer.File;
  status: string;
  description: string;
  userId: string;
}
