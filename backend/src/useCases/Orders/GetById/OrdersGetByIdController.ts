import { Request, Response } from 'express';
import OrdersGetByIdCase from './OrdersGetByIdCase';
import OrdersGetByIdVerifications from './OrdersGetByIdVerifications';
import errorHandler from '@handlers/errorHandler';
import IOrdersGetByIdDTO from './IOrdersGetByIdDTO';

export default class OrdersGetByIdController {
  constructor(
    private ordersGetByIdVerification: OrdersGetByIdVerifications,
    private ordersGetByIdCase: OrdersGetByIdCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
        const requestData: IOrdersGetByIdDTO = {
            condominiumId: req.params.condominiumId,
            userId: req.userID,
            orderId: req.params.orderId,
        }

        this.ordersGetByIdVerification.execute(requestData);
        const order = await this.ordersGetByIdCase.execute(requestData);

        res.status(200).json(order);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
