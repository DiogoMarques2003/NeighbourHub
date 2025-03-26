import { Request, Response } from 'express';
import OrdersGetCase from './OrdersGetCase';
import OrdersGetVerifications from './OrdersGetVerifications';
import errorHandler from '@handlers/errorHandler';
import IOrdersGetDTO from './IOrdersGetDTO';

export default class OrdersGetController {
  constructor(
    private ordersGetVerification: OrdersGetVerifications,
    private ordersGetCase: OrdersGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IOrdersGetDTO = {
        condominiumId: req.params.condominiumId,
        userId: req.userID,
        status: req.query.status as string,
        urgency: req.query.urgency as string,
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
      };

      this.ordersGetVerification.execute(requestData);
      const orders = await this.ordersGetCase.execute(requestData);

      res.status(200).json(orders);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
