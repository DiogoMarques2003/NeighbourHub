import { Request, Response } from 'express';
import CondominiumPaymentsGetCase from './CondominiumPaymentsGetCase';
import CondominiumPaymentsGetVerifications from './CondominiumPaymentsGetVerifications';
import errorHandler from '@handlers/errorHandler';
import ICondominiumPaymentsGetDTO from './ICondominiumPaymentsGetDTO';

export default class CondominiumPaymentsGetController {
  constructor(
    private condominiumPaymentsGetVerifications: CondominiumPaymentsGetVerifications,
    private condominiumPaymentsGetCase: CondominiumPaymentsGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICondominiumPaymentsGetDTO = {
        condominiumId: req.params.condominiumId,
        addressId: req.query.addressId as string,
        maxValue: Number(req.query.maxValue),
        minValue: Number(req.query.minValue),
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
        paymentType: Number(req.query.paymentType),
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string,
        userId: req.userID,
      };

      if (req.query.startDate) requestData.startDate = new Date(req.query.startDate as string);
      if (req.query.endDate) requestData.endDate = new Date(req.query.endDate as string);

      this.condominiumPaymentsGetVerifications.execute(requestData);
      const data = await this.condominiumPaymentsGetCase.execute(requestData);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
