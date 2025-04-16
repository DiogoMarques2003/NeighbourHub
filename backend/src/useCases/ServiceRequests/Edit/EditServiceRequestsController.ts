import { Request, Response } from 'express';
import EditServiceRequestsCase from './EditServiceRequestsCase';
import EditServiceRequestsVerifications from './EditServiceRequestsVerifications';
import errorHandler from '@handlers/errorHandler';
import IEditServiceRequestsDTO from './IEditServiceRequestsDTO';

export default class EditServiceRequestsController {
  constructor(
    private editServiceRequestsVerifications: EditServiceRequestsVerifications,
    private editServiceRequestsCase: EditServiceRequestsCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IEditServiceRequestsDTO = {
        condominiumId: req.params.condominiumId,
        serviceId: req.params.serviceId,
        serviceRequestId: req.params.serviceRequestId,
        userId: req.userID,
        status: req.body.status,
      };

      this.editServiceRequestsVerifications.execute(requestData);
      const serviceRequest = await this.editServiceRequestsCase.execute(requestData);
      res.status(200).json({ serviceRequest, message: 'Pedido de serviço atualizado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
