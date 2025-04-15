import { Request, Response } from 'express';
import FineGetCase from './FineGetCase';
import FineGetVerifications from './FineGetVerifications';
import errorHandler from '@handlers/errorHandler';
import IFineGetDTO from './IFineGetDTO';

export default class FineGetController {
  constructor(private fineGetVerifications: FineGetVerifications, private fineGetCase: FineGetCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IFineGetDTO = {
        userId: req.userID,
        condominiumId: req.params.condominiumId,
        pageSize: Number(req.query.pageSize),
        pageNumber: Number(req.query.pageNumber),
        minValue: Number(req.query.minValue),
        maxValue: Number(req.query.maxValue),
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string,
        fromUserId: req.query.fromUserId as string,
      };

      this.fineGetVerifications.execute(requestData);
      const data = await this.fineGetCase.execute(requestData);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
