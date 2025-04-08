import { Request, Response } from 'express';
import CondominiumPaymentsDeleteCase from './CondominiumPaymentsDeleteCase';
import CondominiumPaymentsDeleteVerifications from './CondominiumPaymentsDeleteVerifications';
import errorHandler from '@handlers/errorHandler';
import ICondominiumPaymentsDeleteDTO from './ICondominiumPaymentsDeleteDTO';

export default class CondominiumPaymentsDeleteController {
  constructor(
    private condominiumPaymentsDeleteVerifications: CondominiumPaymentsDeleteVerifications,
    private condominiumPaymentsDeleteCase: CondominiumPaymentsDeleteCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
        const requestData: ICondominiumPaymentsDeleteDTO = {
            condominiumId: req.params.condominiumId,
            condominiumPaymentId: req.params.condominiumPaymentId,
            userId: req.userID,
        }

        this.condominiumPaymentsDeleteVerifications.execute(requestData);
        const isDeleted = await this.condominiumPaymentsDeleteCase.execute(requestData);
    
        res.status(isDeleted ? 200 : 500).json({
            message: isDeleted ? 'Pagamento apagado com sucesso' : 'Erro ao apagar o pagamento'
        })
    } catch (err) {
        errorHandler(err, res);
    }
  }
}
