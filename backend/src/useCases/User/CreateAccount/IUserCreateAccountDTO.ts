export default interface IUserCreateAccountDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  iban: string;
  foto?: Express.Multer.File;
}
