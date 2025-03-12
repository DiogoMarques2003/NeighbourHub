import { Request, Response } from 'express';
import UserLoginAccountCase from './UserLoginAccountCase';
import UserLoginAccountVerifications from './UserLoginAccountVerifications';
import errorHandler from '@handlers/errorHandler';
import IUserLoginAccountDTO from './IUserLoginAccountDTO';
import AppError from '@errors/AppError';

export default class UserLoginAccountController {
  constructor(
    private userLoginAccountVerifications: UserLoginAccountVerifications,
    private userLoginAccountCase: UserLoginAccountCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IUserLoginAccountDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      this.userLoginAccountVerifications.execute(requestData);

      const token = await this.userLoginAccountCase.execute(requestData);
      if (!token) throw new AppError('Erro ao fazer login', 500);

      res.status(200).json({ token, message: 'Login realizado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
