import { Request, Response } from 'express';
import FineEditCase from './FineEditCase';
import FineEditVerifications from './FineEditVerifications';
import errorHandler from '@handlers/errorHandler';
import IFineEditDTO from './IFineEditDTO';

export default class FineEditController {
  constructor(private fineEditVerifications: FineEditVerifications, private fineEditCase: FineEditCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IFineEditDTO = {
        amount: req.body.amount,
        reason: req.body.reason,
        userId: req.userID,
        fineId: req.params.fineId,
        areaReservationId: req.params.areaReservationId,
        commonAreaId: req.params.commonAreaId,
        condominiumId: req.params.condominiumId,
      };

      this.fineEditVerifications.execute(requestData);
      const fine = await this.fineEditCase.execute(requestData);

      return res.status(200).json({ fine, message: 'Multa editada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
