import { Request, Response } from 'express';
import CondominiumDeleteCase from './CondominiumDeleteCase';
import CondominiumDeleteVerifications from './CondominiumDeleteVerifications';
import ICondominiumDeleteDTO from './ICondominiumDeleteDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class CondominiumDeleteController {
  constructor(
    private condominiumDeleteVerifications: CondominiumDeleteVerifications,
    private condominiumDeleteCase: CondominiumDeleteCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumDeleteDTO = {
        condominiumID: req.params.condominiumID,
        userID: req.userID,
      };

      this.condominiumDeleteVerifications.execute(requestData);
      const isDeleted = await this.condominiumDeleteCase.execute(requestData);

      res
        .status(200)
        .json({
          message: isDeleted
            ? 'Condominio removido com sucesso.'
            : 'Não foi possível apagar o condomínio.',
        });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
