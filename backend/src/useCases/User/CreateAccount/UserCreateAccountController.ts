import { Request, Response } from 'express';
import UserCreateAccountcase from './UserCreateAccountCase';
import UserCreateAccountVerifications from './UserCreateAccountVerifications';
import IUserCreateAccountDTO from './IUserCreateAccountDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class UserCreateAccountController {
  constructor(
    private userCreateAccountVerifications: UserCreateAccountVerifications,
    private userCreateAccountCase: UserCreateAccountcase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IUserCreateAccountDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        iban: req.body.iban,
        foto: req?.file as Express.Multer.File,
      };

      this.userCreateAccountVerifications.execute(requestData);

      const token = await this.userCreateAccountCase.execute(requestData);
      if (!token) throw new AppError('Erro ao criar a conta', 500);

      res.status(201).json({ token, message: 'Conta criada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
