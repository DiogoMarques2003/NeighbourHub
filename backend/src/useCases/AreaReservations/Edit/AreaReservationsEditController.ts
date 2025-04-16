import { Request, Response } from 'express';
import AreaReservationsEditCase from './AreaReservationsEditCase';
import AreaReservationsEditVerifications from './AreaReservationsEditVerifications';
import errorHandler from '@handlers/errorHandler';
import IAreaReservationsEditDTO from './IAreaReservationsEditDTO';

export default class AreaReservationsEditController {
  constructor(
    private areaReservationsEditVerifications: AreaReservationsEditVerifications,
    private areaReservationsEditCase: AreaReservationsEditCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAreaReservationsEditDTO = {
        areaId: req.params.areaId,
        condominiumId: req.params.condominiumId,
        reservationId: req.params.reservationId,
        endDate: req.body.endDate,
        startDate: req.body.startDate,
        status: req.body.status,
        userId: req.userID,
      };

      this.areaReservationsEditVerifications.execute(requestData);
      const reservation = await this.areaReservationsEditCase.execute(requestData);

      res.status(200).json({ reservation, message: 'Reserva editada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
