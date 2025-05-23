import { Request, Response } from 'express';
import OrdersEditCase from './OrdersEditCase';
import OrdersEditVerifications from './OrdersEditVerifications';
import errorHandler from '@handlers/errorHandler';
import IOrdersEditDTO from './IOrdersEditDTO';

export default class OrdersEditController {
  constructor(private ordersEditVerifications: OrdersEditVerifications, private ordersEditCase: OrdersEditCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IOrdersEditDTO = {
        condominiumId: req.params.condominiumId,
        orderId: req.params.orderId,
        userId: req.userID,
        title: req.body.title,
        description: req.body.description,
        urgency: req.body.urgency,
        status: req.body.status,
      };

      this.ordersEditVerifications.execute(requestData);
      const order = await this.ordersEditCase.execute(requestData);

      res.status(200).json({ order, message: 'Pedido atualizado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
