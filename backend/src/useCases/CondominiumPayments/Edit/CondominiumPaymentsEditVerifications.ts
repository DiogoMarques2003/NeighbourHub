import AppError from '@errors/AppError';
import ICondominiumPaymentsEditDTO from './ICondominiumPaymentsEditDTO';
import { isValidUUID } from '@shared/verifications';

export default class CondominiumPaymentsEditVerifications {
  execute(data: ICondominiumPaymentsEditDTO) {
    const { condominiumId, condominiumPaymentId, date, paymentType, value, areaReservationId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!condominiumPaymentId || typeof condominiumPaymentId !== 'string' || !isValidUUID(condominiumPaymentId))
      throw new AppError('Id do pagamento inválido', 400);

    if (areaReservationId && (typeof areaReservationId !== 'string' || !isValidUUID(areaReservationId)))
      throw new AppError('Id da área de reserva inválido', 400);

    if (paymentType && typeof paymentType !== 'number') throw new AppError('Tipo de pagamento inválido', 400);

    if (value && (typeof value !== 'number' || value <= 0)) throw new AppError('Valor inválido', 400);

    if (date) {
      if (typeof date !== 'string') throw new AppError('Data inválida', 400);

      data.date = new Date(date);
      if (isNaN(data.date.getTime()) || data.date > new Date()) throw new AppError('Data inválida', 400);
    }
  }
}
