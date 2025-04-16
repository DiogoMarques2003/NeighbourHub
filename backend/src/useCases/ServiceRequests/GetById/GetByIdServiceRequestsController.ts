import { Request, Response } from 'express';
import GetByIdServiceRequestsCase from './GetByIdServiceRequestsCase';
import GetByIdServiceRequestsVerifications from './GetByIdServiceRequestsVerifications';
import errorHandler from '@handlers/errorHandler';
import IGetByIdServiceRequestsDTO from './IGetByIdServiceRequestsDTO';

export default class GetByIdServiceRequestsController {
  constructor(
    private getByIdServiceRequestsVerifications: GetByIdServiceRequestsVerifications,
    private getByIdServiceRequestsCase: GetByIdServiceRequestsCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IGetByIdServiceRequestsDTO = {
        condominiumId: req.params.condominiumId,
        serviceId: req.params.serviceId,
        serviceRequestId: req.params.serviceRequestId,
        userId: req.userID,
      };

      this.getByIdServiceRequestsVerifications.execute(requestData);
      const serviceRequest = await this.getByIdServiceRequestsCase.execute(requestData);

      res.status(200).json(serviceRequest);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
