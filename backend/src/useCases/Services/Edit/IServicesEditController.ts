import ServicesEditCase from './IServicesEditCase';
import ServicesEditVerifications from './IServicesEditVerifications';
import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import IServicesEditDTO from './IServicesEditDTO';

export default class ServicesEditController {
  constructor(private serviceEditVerifications: ServicesEditVerifications, private serviceEditCase: ServicesEditCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesEditDTO = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        id: req.params.serviceId,
        ownerId: req.userID,
        condId: req.params.condId,
      };

      this.serviceEditVerifications.execute(requestData);
      const service = await this.serviceEditCase.execute(requestData);

      res.status(200).json({ service, message: 'Serviço editado com sucessp' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
