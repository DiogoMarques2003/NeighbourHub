import { Request, Response } from 'express';
import CondominiumCreateCase from './CondominiumCreateCase';
import CondominiumCreateVerifications from './CondominiumCreateVerifications';
import ICondominiumCreateDTO from './ICondominiumCreateDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class CondominiumCreateController {
  constructor(
    private condominiumCreateVerifications: CondominiumCreateVerifications,
    private condominiumCreateCase: CondominiumCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumCreateDTO = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        monthlyQuota: req.body.monthlyQuota,
        adminId: req.userID,
      };

      this.condominiumCreateVerifications.execute(requestData);
      const condominium = await this.condominiumCreateCase.execute(requestData);

      if (!condominium)
        throw new AppError('Erro ao registar novo condominio', 500);

      res
        .status(201)
        .json({ condominium, message: 'Condominio criado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
