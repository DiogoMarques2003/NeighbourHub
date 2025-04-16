import { Request, Response } from 'express';
import AreaReservationsDeleteCase from './AreaReservationsDeleteCase';
import AreaReservationsDeleteVerifications from './AreaReservationsDeleteVerifications';
import errorHandler from '@handlers/errorHandler';
import IAreaReservationsDeleteDTO from './IAreaReservationsDeleteDTO';

export default class AreaReservationsDeleteController {
  constructor(
    private areaReservationsDeleteVerifications: AreaReservationsDeleteVerifications,
    private areaReservationsDeleteCase: AreaReservationsDeleteCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAreaReservationsDeleteDTO = {
        condominiumId: req.params.condominiumId,
        areaId: req.params.areaId,
        reservationId: req.params.reservationId,
        userId: req.userID,
      };

      this.areaReservationsDeleteVerifications.execute(requestData);
      const isDeleted = await this.areaReservationsDeleteCase.execute(requestData);

      res
        .status(isDeleted ? 200 : 500)
        .json({ message: isDeleted ? 'Reserva apagada com sucesso' : 'Erro ao apagar reserva' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
