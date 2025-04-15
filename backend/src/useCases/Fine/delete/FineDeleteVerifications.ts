import AppError from '@errors/AppError';
import IFineDeleteDTO from './IFineDeleteDTO';
import { isValidUUID } from '@shared/verifications';

export default class FineDeleteVerifications {
  execute(data: IFineDeleteDTO) {
    const { areaReservationId, commonAreaId, condominiumId, fineId } = data;

    if (!areaReservationId || typeof areaReservationId !== 'string' || !isValidUUID(areaReservationId))
      throw new AppError('Reserva inválida', 400);

    if (!commonAreaId || typeof commonAreaId !== 'string' || !isValidUUID(commonAreaId))
      throw new AppError('Área comum inválida', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Condomínio inválido', 400);

    if (!fineId || typeof fineId !== 'string' || !isValidUUID(fineId)) throw new AppError('Multa inválida', 400);
  }
}
