import { Request, Response } from 'express';
import ServiceReviewsGetCase from './ServiceReviewsGetCase';
import ServiceReviewsGetVerifications from './ServiceReviewsGetVerifications';
import errorHandler from '@handlers/errorHandler';
import IServiceReviewsGetDTO from './IServiceReviewsGetDTO';

export default class ServiceReviewsGetController {
  constructor(
    private serviceReviewsGetVerifications: ServiceReviewsGetVerifications,
    private serviceReviewsGetCase: ServiceReviewsGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IServiceReviewsGetDTO = {
        condominiumId: req.params.condominiumId,
        serviceId: req.params.serviceId,
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string,
        userId: req.userID,
      };

      this.serviceReviewsGetVerifications.execute(requestData);
      const data = await this.serviceReviewsGetCase.execute(requestData);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
