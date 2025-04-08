import { isValidUUID } from '@shared/verifications';
import ICondominiumPaymentsCreateDTO from './ICondominiumPaymentsCreateDTO';
import AppError from '@errors/AppError';

export default class CondominiumPaymentsVerifications {
  execute(data: ICondominiumPaymentsCreateDTO) {
    const { addressId, areaReservationId, condominiumId, paymentType, value, date } = data;

    if (!addressId || typeof addressId !== 'string' || !isValidUUID(addressId))
      throw new AppError('Id do endereço inválido', 400);

    if (areaReservationId && (typeof areaReservationId !== 'string' || !isValidUUID(areaReservationId)))
      throw new AppError('Id da área de reserva inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!paymentType || typeof paymentType !== 'number') throw new AppError('Tipo de pagamento inválido', 400);

    if (!value || typeof value !== 'number' || value <= 0) throw new AppError('Valor inválido', 400);

    if (!date || typeof date !== 'string') throw new AppError('Data inválida', 400);

    data.date = new Date(date);
    if (isNaN(data.date.getTime()) || data.date > new Date()) throw new AppError('Data inválida', 400);
  }
}
