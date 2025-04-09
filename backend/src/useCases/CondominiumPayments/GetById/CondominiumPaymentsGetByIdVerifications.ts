import AppError from '@errors/AppError';
import ICondominiumPaymentsGetByIdDTO from './ICondominiumPaymentsGetByIdDTO';
import { isValidUUID } from '@shared/verifications';

export default class CondominiumPaymentsGetByIdVerifications {
  execute(data: ICondominiumPaymentsGetByIdDTO) {
    const { condominiumId, condominiumPaymentId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!condominiumPaymentId || typeof condominiumPaymentId !== 'string' || !isValidUUID(condominiumPaymentId))
      throw new AppError('Id do pagamento inválido', 400);
  }
}
