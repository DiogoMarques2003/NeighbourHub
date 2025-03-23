import { Request, Response } from 'express';
import OrdersCreateCase from './OrdersCreateCase';
import OrdersCreateVerifications from './OrdersCreateVerifications';
import errorHandler from '@handlers/errorHandler';
import IOrdersCreateDTO from './IOrdersCreateDTO';
import AppError from '@errors/AppError';

export default class OrdersCreateController {
  constructor(
    private ordersCreateVerifications: OrdersCreateVerifications,
    private ordersCreateCase: OrdersCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IOrdersCreateDTO = {
        description: req.body.description,
        urgency: req.body.urgency,
        lastOrder: req.body.lastOrder,
        userId: req.userID,
        condominiumId: req.params.condominiumId,
      };

      this.ordersCreateVerifications.execute(requestData);
      const order = await this.ordersCreateCase.execute(requestData);
      if (!order) throw new AppError('Erro ao criar novo pedido', 500);

      res.status(201).json({ order, message: 'Pedido criado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
