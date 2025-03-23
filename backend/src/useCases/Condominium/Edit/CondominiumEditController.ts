import { Request, Response } from 'express';
import CondominiumEditCase from './CondominiumEditCase';
import CondominiumEditVerifications from './CondominiumEditVerifications';
import ICondominiumUpdateDTO from './ICondominiumEditDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class CondominiumEditController {
  constructor(
    private condominiumEditVerifications: CondominiumEditVerifications,
    private condominiumEditCase: CondominiumEditCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumUpdateDTO = {
        userID: req.userID,
        idCondominium: req.params.idCondominium,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        monthlyQuota: req.body.monthlyQuota,
      };

      this.condominiumEditVerifications.execute(requestData);
      const condominium = await this.condominiumEditCase.execute(requestData);

      if (!condominium) throw new AppError('Erro ao editar condomínio', 500);

      res
        .status(200)
        .json({ condominium, message: 'Condomínio atualizado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
