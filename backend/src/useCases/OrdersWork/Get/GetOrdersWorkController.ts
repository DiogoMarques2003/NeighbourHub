import { Request, Response } from 'express';
import GetOrdersWorkCase from './GetOrdersWorkCase';
import GetOrdersWorkVerifications from './GetOrdersWorkVerifications';
import errorHandler from '@handlers/errorHandler';
import IGetOrdersWorkDTO from './IGetOrdersWorkDTO';

export default class GetOrdersworkController {
  constructor(
    private getOrdersWorkVerifications: GetOrdersWorkVerifications,
    private getOrdersWorkCase: GetOrdersWorkCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestData: IGetOrdersWorkDTO = {
        condominiumId: req.params.condominiumId,
        orderId: req.params.orderId,
        userId: req.userID,
        pageNumber: Number(req.query.pageNumber),
        pageSize: Number(req.query.pageSize),
        hasReport: req.query.hasReport === undefined ? undefined : req.query.hasReport === 'true',
        status: req.query.status as string,
      };

      this.getOrdersWorkVerifications.execute(requestData);
      const data = await this.getOrdersWorkCase.execute(requestData);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
