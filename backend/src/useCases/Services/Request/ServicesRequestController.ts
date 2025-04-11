import { Request, Response } from 'express';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';
import ServicesRequestVerifications from './ServicesRequestVerifications';
import ServicesRequestCase from './ServicesRequestCase';
import IServicesRequestDTO from './IServicesRequestDTO';

export default class ServicesRequestController {
  constructor(
    private servicesVerification: ServicesRequestVerifications,
    private servicesReqCase: ServicesRequestCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesRequestDTO = {
        condId: req.params.condId,
        userId: req.userID,
        serviceId: req.params.serviceId,
      };

      this.servicesVerification.execute(requestData);
      const servReq = await this.servicesReqCase.execute(requestData);

      res.status(200).json({ servReq, message: 'Request feito com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
