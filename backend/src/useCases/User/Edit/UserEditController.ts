import { Request, Response } from 'express';
import UserEditCase from './UserEditCase';
import UserEditVerifications from './UserEditVerifications';
import errorHandler from '@handlers/errorHandler';
import IUserEditDTO from './IUserEditDTO';

export default class UserEditController {
  constructor(private userEditVerifications: UserEditVerifications, private userEditCase: UserEditCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IUserEditDTO = {
        id: req.userID,
        name: req.body.name,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        iban: req.body.iban,
        foto: req?.file as Express.Multer.File,
        deleteFoto: req.body.deleteFoto === 'true',
      };

      this.userEditVerifications.execute(requestData);
      const user = await this.userEditCase.execute(requestData);

      res.status(200).json({ user, message: 'Dados editados com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
