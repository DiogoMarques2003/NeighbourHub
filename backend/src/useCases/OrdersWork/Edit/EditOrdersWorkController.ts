import { Request, Response } from 'express';
import EditOrdersWorkCase from './EditOrdersWorkCase';
import EditOrdersWorkVerifications from './EditOrdersWorkVerifications';
import errorHandler from '@handlers/errorHandler';
import IEditOrdersWorkDTO from './IEditOrdersWorkDTO';

export default class EditOrdersWorkController {
  constructor(
    private editOrdersWorkVerifications: EditOrdersWorkVerifications,
    private editOrdersWorkCase: EditOrdersWorkCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const requestdata: IEditOrdersWorkDTO = {
        condominiumId: req.params.condominiumId,
        deleteReportFile: req.body.deleteReportFile,
        description: req.body.description,
        orderId: req.params.orderId,
        orderWorkId: req.params.orderWorkId,
        reportFile: req?.file as Express.Multer.File,
        status: req.body.status,
        userId: req.userID,
      };

      this.editOrdersWorkVerifications.execute(requestdata);
      const orderWork = await this.editOrdersWorkCase.execute(requestdata);

      res.status(200).json({
        orderWork,
        message: 'Atualização realizada com sucesso',
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }
}
