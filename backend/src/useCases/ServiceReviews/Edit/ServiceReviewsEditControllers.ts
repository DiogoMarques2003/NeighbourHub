import { Request, Response } from 'express';
import ServiceReviewsEditCase from './ServiceReviewsEditCase';
import ServiceReviewsEditVerifications from './ServiceReviewsEditVerifications';
import errorHandler from '@handlers/errorHandler';
import IServiceReviewsEditDTO from './IServiceReviewsEditDTO';

export default class ServiceReviewsEditController {
  constructor(
    private serviceReviewsEditVerifications: ServiceReviewsEditVerifications,
    private serviceReviewsEditCase: ServiceReviewsEditCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const reqestData: IServiceReviewsEditDTO = {
        condominiumId: req.params.condominiumId,
        serviceId: req.params.serviceId,
        serviceRequestId: req.params.serviceRequestId,
        serviceReviewId: req.params.serviceReviewId,
        userId: req.userID,
        comment: req.body.comment,
        rating: req.body.rating,
      };

      this.serviceReviewsEditVerifications.execute(reqestData);
      const serviceReview = await this.serviceReviewsEditCase.execute(reqestData);

      res.status(200).json({ serviceReview, message: 'Avaliação editada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
