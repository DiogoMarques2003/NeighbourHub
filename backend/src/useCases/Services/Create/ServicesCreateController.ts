import { Request, Response } from 'express';
import ServicesCreateVerifications from './ServicesCreateVerifications';
import ServicesCreateCase from './ServicesCreateCase';
import IServicesCreateDTO from './IServicesCreateDTO';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class ServicesCreateController {
  constructor(private servicesVerifications: ServicesCreateVerifications, private servicesCase: ServicesCreateCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesCreateDTO = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        condId: req.params.condId,
        ownerId: req.userID,
      };

      this.servicesVerifications.execute(requestData);
      const areaReserv = await this.servicesCase.execute(requestData);
      if (!areaReserv) throw new AppError('Erro ao criar novo serviço', 500);

      res.status(201).json({ areaReserv, message: 'Serviço criado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
