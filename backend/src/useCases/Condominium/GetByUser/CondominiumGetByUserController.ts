import { Request, Response } from 'express';
import CondominiumGetByUserCase from './CondominiumGetByUserCase';
import CondominiumGetByUserVerifications from './CondominiumGetByUserVerifications';
import errorHandler from '@handlers/errorHandler';
import IcondominiumGetByUserDTO from './ICondominiumGetByUserDTO';

export default class CondominiumGetByUserController {
  constructor(
    private condominiumGetByUserVerifications: CondominiumGetByUserVerifications,
    private condominiumGetByUserCase: CondominiumGetByUserCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IcondominiumGetByUserDTO = {
        userId: req.userID,
        isAdmin: String(req.query.isAdmin).toLowerCase() === 'true',
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
      };

      this.condominiumGetByUserVerifications.execute(requestData);
      const data = await this.condominiumGetByUserCase.execute(requestData);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
