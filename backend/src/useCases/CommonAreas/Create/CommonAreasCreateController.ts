import { Request, Response } from 'express';
import CommonAreasCreateCase from './CommonAreasCreateCase';
import CommonAreasCreateVerifications from './CommonAreasCreateVerifications';
import errorHandler from '@handlers/errorHandler';
import ICommonAreasCreateDTO from './ICommonAreasCreateDTO';
import AppError from '@errors/AppError';

export default class CommonAreasCreateController {
  constructor(
    private commonAreasCreateVerifications: CommonAreasCreateVerifications,
    private commonAreasCreateCase: CommonAreasCreateCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: ICommonAreasCreateDTO = {
        userId: req.userID,
        name: req.body.name,
        cost: req.body.cost,
        rules: req.body.rules,
        capacity: req.body.capacity,
        type: req.body.type,
        images: req.files as  Express.Multer.File[],
        condominiumId: req.params.id,
        endSchedule: req.body.endSchedule,
        startSchedule: req.body.startSchedule,
      };

      this.commonAreasCreateVerifications.execute(requestData);
      const commonArea = await this.commonAreasCreateCase.execute(requestData);

      if (!commonArea) throw new AppError('Erro ao registar novo espaço', 500);

      res
        .status(201)
        .json({ commonArea, message: 'Espaço criado com sucesso' });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
