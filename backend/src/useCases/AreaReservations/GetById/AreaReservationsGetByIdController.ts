import { Request, Response } from 'express';
import AreaReservationsGetByIdCase from './AreaReservationsGetByIdCase';
import AreaReservationsGetByIdVerifications from './AreaReservationsGetByIdVerifications';
import errorHandler from '@handlers/errorHandler';
import IAreaReservationsGetByIdDTO from './IAreaReservationsGetByIdDTO';

export default class AreaReservationsGetByIdController {
  constructor(
    private areaReservationsGetByIdVerifications: AreaReservationsGetByIdVerifications,
    private areaReservationsGetByIdCase: AreaReservationsGetByIdCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAreaReservationsGetByIdDTO = {
        areaId: req.params.areaId,
        condominiumId: req.params.condominiumId,
        reservationId: req.params.reservationId,
        userId: req.userID,
      };

      this.areaReservationsGetByIdVerifications.execute(requestData);
      const reservation = await this.areaReservationsGetByIdCase.execute(requestData);

      res.status(200).json(reservation);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
