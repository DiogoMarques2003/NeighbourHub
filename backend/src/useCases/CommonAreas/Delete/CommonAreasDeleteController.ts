import { Request, Response } from 'express';
import errorHandler from '@handlers/errorHandler';
import CommonAreasDeleteCase from './CommonAreasDeleteCase';
import CommonAreasDeleteVerifications from './CommonAreasDeleteVerifications';
import ICommonAreasDeleteDTO from './ICommonAreasDeleteDTO';

export default class CommonAreasDeleteController {
  constructor(
    private commonAreasDeleteVerifications: CommonAreasDeleteVerifications,
    private commonAreasDeleteCase: CommonAreasDeleteCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICommonAreasDeleteDTO = {
        userId: req.userID,
        condominiumId: req.params.condominiumId,
        commonAreaId: req.params.idCommonArea,
      };

      this.commonAreasDeleteVerifications.execute(requestData);
      const isDeleted = await this.commonAreasDeleteCase.execute(requestData);

      res.status(isDeleted ? 200 : 500).json({
        message: isDeleted ? 'Área comum apagada com sucesso' : 'Erro ao apagar área comum',
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
