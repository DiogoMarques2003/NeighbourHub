import { Request, Response } from 'express';
import FineCreateCase from './FineCreateCase';
import FineCreateVerifications from './FineCreateVerifications';
import errorHandler from '@handlers/errorHandler';
import IFineCreateDTO from './IFineCreateDTO';

export default class FineCreateController {
  constructor(private fineCreateVerifications: FineCreateVerifications, private fineCreateCase: FineCreateCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IFineCreateDTO = {
        amount: req.body.amount,
        reason: req.body.reason,
        userId: req.userID,
        areaReservationId: req.params.areaReservationId,
        commonAreaId: req.params.commonAreaId,
        condominiumId: req.params.condominiumId,
      };

      this.fineCreateVerifications.execute(requestData);
      const fine = await this.fineCreateCase.execute(requestData);

      res.status(201).json({ fine, message: 'Multa criada com sucesso!' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
