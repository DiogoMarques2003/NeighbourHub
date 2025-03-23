import { Request, Response } from 'express';
import CondominiumGetCase from './CondominiumGetCase';
import CondominiumGetVerifications from './CondominiumGetVerifications';
import ICondominiumGetDTO from './ICondominiumGetDTO';
import errorHandler from '@handlers/errorHandler';

export default class CondominiumGetController {
  constructor(
    private condominiumGetVerifications: CondominiumGetVerifications,
    private condominiumGetCase: CondominiumGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumGetDTO = {
        id: req.params.id,
      };

      this.condominiumGetVerifications.execute(requestData);
      const condominium = await this.condominiumGetCase.execute(requestData);

      res.status(200).json({ condominium });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
