import { Request, Response } from 'express';
import CommonAreasGetByIdCase from './CommonAreasGetByIdCase';
import CommonAreasGetByIdVerifications from './CommonAreasGetByIdVerifications';
import errorHandler from '@handlers/errorHandler';
import ICommonAreasDeleteDTO from '../Delete/ICommonAreasDeleteDTO';

export default class CommonAreasGetByIdController {
  constructor(
    private commonAreasGetByIdVerification: CommonAreasGetByIdVerifications,
    private commonAreasGetByIdCase: CommonAreasGetByIdCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICommonAreasDeleteDTO = {
        commonAreaId: req.params.commonAreaId,
        condominiumId: req.params.condominiumId,
        userId: req.userID,
      };

      this.commonAreasGetByIdVerification.execute(requestData);
      const area = await this.commonAreasGetByIdCase.execute(requestData);

      res.status(200).json(area);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
