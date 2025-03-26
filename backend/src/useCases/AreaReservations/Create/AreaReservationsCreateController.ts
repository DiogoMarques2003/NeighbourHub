import { Request, Response } from 'express';
import AreaReservationsCreateCase from './AreaReservationsCreateCase';
import IAreaReservationsDTO from './AreaReservationsCreateDTO';
import AreaReservationsCreateVerifications from './AreaReservationsCreateVerifications';
import AppError from '@errors/AppError';
import errorHandler from '@handlers/errorHandler';

export default class areaReservationCreateController {
  constructor(
    private areaReservationVerifications: AreaReservationsCreateVerifications,
    private areaReservationCase: AreaReservationsCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IAreaReservationsDTO = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        areaId: req.params.idCommonArea,
        condId: req.params.condId,
        userId: req.userID,
      };

      this.areaReservationVerifications.execute(requestData);
      const areaReserv = await this.areaReservationCase.execute(requestData);
      if (!areaReserv) throw new AppError('Erro ao criar nova reserva', 500);

      res.status(201).json({ areaReserv, message: 'Reserva criada com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
