export default interface IUserEditDTO {
  id: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  iban?: string;
  foto?: Express.Multer.File;
  deleteFoto?: boolean;
}
