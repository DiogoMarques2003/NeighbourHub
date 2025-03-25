import { Request, Response } from 'express';
import CommonAreasEditCase from './CommonAreasEditCase';
import CommonAreasEditVerifications from './CommonAreasEditVerifications';
import errorHandler from '@handlers/errorHandler';
import ICommonAreasCreateDTO from './ICommonAreasEditDTO';
import AppError from '@errors/AppError';

export default class CommonAreasEditController {
  constructor(
    private commonAreasEditVerifications: CommonAreasEditVerifications,
    private commonAreasEditCase: CommonAreasEditCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICommonAreasCreateDTO = {
        id: req.params.idCommonArea,
        status: req.body.status,
        userId: req.userID,
        name: req.body.name,
        cost: req.body.cost,
        rules: req.body.rules,
        capacity: req.body.capacity,
        type: req.body.type,
        imagesAdd: req.files as Express.Multer.File[],
        imagesRemove: req.body.imagesRemove,
        condominiumId: req.params.condominiumId,
        endSchedule: req.body.endSchedule,
        startSchedule: req.body.startSchedule,
      };

      this.commonAreasEditVerifications.execute(requestData);
      const commonArea = await this.commonAreasEditCase.execute(requestData);

      if (!commonArea) throw new AppError('Erro ao editar espaço', 500);

      res
        .status(200)
        .json({ commonArea, message: 'Espaço editado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
