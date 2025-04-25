import { Request, Response } from 'express';
import IServicesGetAllDTO from './IServicesGetAllDTO';
import ServicesGetAllCase from './ServicesGetAllCase';
import ServicesGetAllVerifications from './ServicesGetAllVerifications';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class ServicesGetAllController {
  constructor(private servicesVerifications: ServicesGetAllVerifications, private servicesCase: ServicesGetAllCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesGetAllDTO = {
        condId: req.params.condId,
        userId: req.userID,
        myServices: req.query.myServices === 'true',
        minReviews: Number(req.query.minReviews),
        maxReviews: Number(req.query.maxReviews),
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
      };

      this.servicesVerifications.execute(requestData);
      const services = await this.servicesCase.execute(requestData);
      if (!services) throw new AppError('Nenhum serviço registado no condominio', 500);

      res.status(201).json( services );
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
