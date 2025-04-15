import { Request, Response } from 'express';
import DeleteOrdersWorkCase from './DeleteOrdersWorkCase';
import DeleteOrdersWorkVerifications from './DeleteOrdersWorkVerifications';
import errorHandler from '@handlers/errorHandler';
import IDeleteOrdersWorkDTO from './IDeleteOrdersWorkDTO';

export default class DeleteOrdersWorkController {
  constructor(
    private deleteOrdersWorkVerifications: DeleteOrdersWorkVerifications,
    private deleteOrdersWorkCase: DeleteOrdersWorkCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IDeleteOrdersWorkDTO = {
        condominiumId: req.params.condominiumId,
        orderId: req.params.orderId,
        orderWorkId: req.params.orderWorkId,
        userId: req.userID,
      };

      this.deleteOrdersWorkVerifications.execute(requestData);
      const isDeleted = await this.deleteOrdersWorkCase.execute(requestData);

      res.status(isDeleted ? 200 : 500).json({
        message: isDeleted ? 'Atualização do pedido apagada com sucesso' : 'Erro ao apagar atualização do pedido',
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
