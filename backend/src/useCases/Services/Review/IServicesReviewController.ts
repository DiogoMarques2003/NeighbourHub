import errorHandler from '@handlers/errorHandler';
import { Request, Response } from 'express';
import ServicesRequestVerifications from '../Request/ServicesRequestVerifications';
import ServicesReviewCase from './IServicesReviewCase';
import ServicesReviewVerifications from './IServicesReviewVerifications';
import IServicesReviewDTO from './IServicesReviewDTO';

export default class ServicesReviewController {
  constructor(
    private servicesReviewVerification: ServicesReviewVerifications,
    private servicesReviewCase: ServicesReviewCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServicesReviewDTO = {
        condId: req.params.condId,
        serviceId: req.params.serviceId,
        comment: req.body.comment,
        rating: req.body.rating,
        userId: req.userID,
        requestId: req.params.requestId,
      };

      this.servicesReviewVerification.execute(requestData);
      const servRev = await this.servicesReviewCase.execute(requestData);

      res.status(201).json({ servRev, message: 'Avaliação feita com sucessoo' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
