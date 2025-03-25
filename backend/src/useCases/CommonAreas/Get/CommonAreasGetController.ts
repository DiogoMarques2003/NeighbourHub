import { Request, Response } from 'express';
import ICommonAreasGetDTO from './ICommonAreasGetDTO';
import errorHandler from '@handlers/errorHandler';
import CommonAreasGetVerifications from './CommonAreasGetVerifications';
import CommonAreasGetCase from './CommonAreasGetCase';

export default class CommonAreasGetController {
  constructor(
    private commonareasGetVerification: CommonAreasGetVerifications,
    private commonAreasGetCase: CommonAreasGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICommonAreasGetDTO = {
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
        userId: req.userID,
        condId: req.params.condId,
        type: Number(req.query.type),
      };

      this.commonareasGetVerification.execute(requestData);
      const areas = await this.commonAreasGetCase.execute(requestData);

      res.status(200).json(areas);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
