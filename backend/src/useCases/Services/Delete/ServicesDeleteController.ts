import { Request, Response } from 'express';
import ServicesDeleteCase from './ServicesDeleteCase';
import ServicesDeleteVerifications from './ServicesDeleteVerifications';
import errorHandler from '@handlers/errorHandler';
import IServicesDeleteDTO from './IServicesDeleteDTO';

export default class ServicesDeleteController {
  constructor(
    private servicesDeleteVerifications: ServicesDeleteVerifications,
    private servicesDeleteCase: ServicesDeleteCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesDeleteDTO = {
        condominiumId: req.params.condominiumId,
        serviceId: req.params.serviceId,
        userId: req.userID,
      };

      this.servicesDeleteVerifications.exectue(requestData);
      const isServiceDeleted = await this.servicesDeleteCase.execute(requestData);

      res.status(isServiceDeleted ? 200 : 500).json({
        message: isServiceDeleted ? 'Serviço apagado com sucesso' : 'Erro ao apagar o serviço',
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
