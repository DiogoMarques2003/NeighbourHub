import { Request, Response } from 'express';
import CreateOrdersWorkCase from './CreateOrdersWorkCase';
import CreateOrdersWorkVerifications from './CreateOrdersWorkVerifications';
import ICreateOrdersWorkDTO from './ICreateOrdersWorkDTO';
import errorHandler from '@handlers/errorHandler';

export default class CreateOrdersWorkController {
  constructor(
    private createOrdersWorkVerifications: CreateOrdersWorkVerifications,
    private createOrdersWorkCase: CreateOrdersWorkCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestdata: ICreateOrdersWorkDTO = {
        condominiumId: req.params.condominiumId,
        description: req.body.description,
        orderId: req.params.orderId,
        status: req.body.status,
        reportFile: req?.file as Express.Multer.File,
        userId: req.userID,
      };

      this.createOrdersWorkVerifications.execute(requestdata);
      const orderWork = await this.createOrdersWorkCase.execute(requestdata);

      res.status(201).json({
        orderWork,
        message: 'Atualização do pedido criada com sucesso',
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
