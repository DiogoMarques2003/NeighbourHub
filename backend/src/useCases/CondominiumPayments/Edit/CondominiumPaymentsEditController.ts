import { Request, Response } from 'express';
import CondominiumPaymentsEditCase from './CondominiumPaymentsEditCase';
import CondominiumPaymentsEditVerifications from './CondominiumPaymentsEditVerifications';
import errorHandler from '@handlers/errorHandler';
import ICondominiumPaymentsEditDTO from './ICondominiumPaymentsEditDTO';

export default class CondominiumPaymentsEditController {
  constructor(
    private condominiumPaymentsEditVerifications: CondominiumPaymentsEditVerifications,
    private condominiumPaymentsEditCase: CondominiumPaymentsEditCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumPaymentsEditDTO = {
        value: req.body.value,
        date: req.body.date,
        paymentType: req.body.paymentType,
        areaReservationId: req.body.areaReservationId,
        condominiumId: req.params.condominiumId,
        condominiumPaymentId: req.params.condominiumPaymentId,
        userId: req.userID,
      };

        this.condominiumPaymentsEditVerifications.execute(requestData);
        const condominiumPayment = await this.condominiumPaymentsEditCase.execute(requestData);

        res.status(200).json({ condominiumPayment, message: 'Pagamento editado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
