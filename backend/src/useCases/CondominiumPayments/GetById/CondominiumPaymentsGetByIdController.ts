import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import CondominiumPaymentsGetByIdCase from './CondominiumPaymentsGetByIdCase';
import CondominiumPaymentsGetByIdVerifications from './CondominiumPaymentsGetByIdVerifications';
import ICondominiumPaymentsGetByIdDTO from './ICondominiumPaymentsGetByIdDTO';

export default class CondominiumPaymentsGetByIdController {
  constructor(
    private condominiumPaymentsGetByIdVerifications: CondominiumPaymentsGetByIdVerifications,
    private condominiumPaymentsGetByIdCase: CondominiumPaymentsGetByIdCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumPaymentsGetByIdDTO = {
        condominiumId: req.params.condominiumId,
        condominiumPaymentId: req.params.condominiumPaymentId,
        userId: req.userID,
      };

      this.condominiumPaymentsGetByIdVerifications.execute(requestData);
      const condominiumPayment = await this.condominiumPaymentsGetByIdCase.execute(requestData);

      res.status(200).json(condominiumPayment);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
