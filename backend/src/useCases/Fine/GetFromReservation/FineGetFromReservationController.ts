import { Request, Response } from 'express';
import FineGetFromReservationCase from './FineGetFromReservationCase';
import FineGetFromReservationVerification from './FineGetFromReservationVerification';
import errorHandler from '@handlers/errorHandler';
import IFineGetFromReservationDTO from './IFineGetFromReservationDTO';
import AppError from '@errors/AppError';

export default class FineGetFromReservationController {
  constructor(
    private fineGetFromReservationVerification: FineGetFromReservationVerification,
    private fineGetFromReservationCase: FineGetFromReservationCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IFineGetFromReservationDTO = {
        areaReservationId: req.params.areaReservationId,
        commonAreaId: req.params.commonAreaId,
        condominiumId: req.params.condominiumId,
        userId: req.userID,
      };

      this.fineGetFromReservationVerification.execute(requestData);
      const fine = await this.fineGetFromReservationCase.execute(requestData);
      if (!fine) throw new AppError('Reserva não tem nenhuma multa', 404);

      res.status(200).json(fine);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
