import AppError from '@errors/AppError';
import IFineCreateDTO from './IFineCreateDTO';
import { isValidUUID } from '@shared/verifications';

export default class FineCreateVerifications {
  execute(data: IFineCreateDTO) {
    const { amount, areaReservationId, condominiumId, reason, commonAreaId } = data;

    if (!areaReservationId || typeof areaReservationId !== 'string' || !isValidUUID(areaReservationId))
      throw new AppError('Reserva inválida', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Condomínio inválido', 400);

    if (!commonAreaId || typeof commonAreaId !== 'string' || !isValidUUID(commonAreaId))
      throw new AppError('Área comum inválida', 400);

    if (!amount || typeof amount !== 'number' || amount <= 0) throw new AppError('Valor da multa inválido', 400);

    if (!reason || typeof reason !== 'string') throw new AppError('Motivo da multa inválido', 400);
  }
}
