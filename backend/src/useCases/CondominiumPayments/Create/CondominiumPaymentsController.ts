import { Request, Response } from 'express';
import CondominiumPaymentsCreateCase from './CondominiumPaymentsCase';
import CondominiumPaymentsVerifications from './CondominiumPaymentsVerifications';
import errorHandler from '@handlers/errorHandler';
import ICondominiumPaymentsCreateDTO from './ICondominiumPaymentsCreateDTO';

export default class CondominiumPaymentsCreateController {
  constructor(
    private condominiumPaymentsCreateVerifications: CondominiumPaymentsVerifications,
    private condominiumPaymentsCreateCase: CondominiumPaymentsCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
        const requestData: ICondominiumPaymentsCreateDTO = {
            value: req.body.value,
            date: req.body.date,
            paymentType: req.body.paymentType,
            addressId: req.body.addressId,
            areaReservationId: req.body.areaReservationId,
            condominiumId: req.params.condominiumId,
            userId: req.userID,
        }

        this.condominiumPaymentsCreateVerifications.execute(requestData);
        const condominiumPayment = await this.condominiumPaymentsCreateCase.execute(requestData);

        res.status(201).json({ condominiumPayment, message: 'Pagamento criado com sucesso' });
    } catch (err) {
        errorHandler(err, res);
    }
  }
}
