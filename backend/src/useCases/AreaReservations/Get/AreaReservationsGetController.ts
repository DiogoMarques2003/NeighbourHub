import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import AreaReservationsGetVerifications from './AreaReservationsGetVerifications';
import AreaReservationsGetCase from './AreaReservationsGetCase';
import IAreaReservationsGetDTO from './IAreaReservationsGetDTO';

export default class AreaReservationsGetController {
  constructor(
    private areaReservationsGetVerifications: AreaReservationsGetVerifications,
    private areaReservationsGetCase: AreaReservationsGetCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAreaReservationsGetDTO = {
        userID: req.userID,
        condID: req.params.condominiumID,
        status: req.query.status as string,
        bGetCondominiumReservations: req.query.bGetCondominiumReservations === "true",
        pageSize: Number(req.query.pageSize),
        pageNumber: Number(req.query.pageNumber)
      };

      this.areaReservationsGetVerifications.execute(requestData);
      const data = await this.areaReservationsGetCase.execute(requestData);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
