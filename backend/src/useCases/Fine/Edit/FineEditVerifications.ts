import AppError from '@errors/AppError';
import IFineEditDTO from './IFineEditDTO';
import { isValidUUID } from '@shared/verifications';

export default class FineEditVerifications {
  execute(data: IFineEditDTO) {
    const { amount, areaReservationId, commonAreaId, condominiumId, fineId, reason } = data;

    if (!areaReservationId || typeof areaReservationId !== 'string' || !isValidUUID(areaReservationId))
      throw new AppError('Reserva inválida', 400);

    if (!commonAreaId || typeof commonAreaId !== 'string' || !isValidUUID(commonAreaId))
      throw new AppError('Área comum inválida', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Condomínio inválido', 400);

    if (!fineId || typeof fineId !== 'string' || !isValidUUID(fineId)) throw new AppError('Multa inválida', 400);

    if (amount && (typeof amount !== 'number' || amount <= 0)) throw new AppError('Valor inválido', 400);

    if (reason && typeof reason !== 'string') throw new AppError('Motivo inválido', 400);
  }
}
