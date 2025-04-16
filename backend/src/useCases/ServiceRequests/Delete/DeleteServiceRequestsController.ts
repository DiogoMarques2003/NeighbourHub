import { Request, Response } from 'express';
import DeleteServiceRequestsCase from './DeleteServiceRequestsCase';
import DeleteServiceRequestsVerifications from './DeleteServiceRequestsVerifications';
import errorHandler from '@handlers/errorHandler';
import IDeleteServiceRequestsDTO from './IDeleteServiceRequestsDTO';

export default class DeleteServiceRequestsController {
  constructor(
    private deleteServiceRequestVerifications: DeleteServiceRequestsVerifications,
    private deleteServiceRequestCase: DeleteServiceRequestsCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IDeleteServiceRequestsDTO = {
        condominiumId: req.params.condominiumId,
        serviceId: req.params.serviceId,
        serviceRequestId: req.params.serviceRequestId,
        userId: req.userID,
      };

      this.deleteServiceRequestVerifications.execute(requestData);
      const isDeleted = await this.deleteServiceRequestCase.execute(requestData);

      res
        .status(isDeleted ? 200 : 500)
        .json({ message: isDeleted ? 'Pedido de serviço apagado com sucesso' : 'Erro ao apagar pedido de serviço' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
