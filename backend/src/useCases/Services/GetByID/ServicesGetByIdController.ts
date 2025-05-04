import { Request, Response } from 'express';
import IServicesGetByIdDTO from './IServicesGetByIdDTO';
import ServicesGetByIdCase from './ServicesGetByIdCase';
import ServicesGetByIdVerifications from './ServicesGetByIdVerifications';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class ServicesGetByIdController {
  constructor(private servicesVerifications: ServicesGetByIdVerifications, private servicesCase: ServicesGetByIdCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesGetByIdDTO = {
        condId: req.params.condId,
        userId: req.userID,
        serviceId: req.params.serviceId,
      };

      this.servicesVerifications.execute(requestData);
      const services = await this.servicesCase.execute(requestData);
      if (!services) throw new AppError('Nenhum serviço registado no condominio', 500);

      res.status(200).json(services);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
