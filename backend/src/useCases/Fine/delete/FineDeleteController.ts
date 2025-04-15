import { Request, Response } from 'express';
import FineDeleteCase from './FineDeleteCase';
import FineDeleteVerifications from './FineDeleteVerifications';
import errorHandler from '@handlers/errorHandler';
import IFineDeleteDTO from './IFineDeleteDTO';

export default class FineDeleteController {
  constructor(private fineDeleteVerifications: FineDeleteVerifications, private fineDeleteCase: FineDeleteCase) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IFineDeleteDTO = {
        areaReservationId: req.params.areaReservationId,
        commonAreaId: req.params.commonAreaId,
        condominiumId: req.params.condominiumId,
        fineId: req.params.fineId,
        userId: req.userID,
      };

      this.fineDeleteVerifications.execute(requestData);
      const isDeleted = await this.fineDeleteCase.execute(requestData);

      res
        .status(isDeleted ? 200 : 500)
        .json({ message: isDeleted ? 'Multa apagada com sucesso' : 'Erro ao apagar multa' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
