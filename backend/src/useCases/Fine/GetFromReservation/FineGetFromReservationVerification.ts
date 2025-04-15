import AppError from '@errors/AppError';
import IFineGetFromReservationDTO from './IFineGetFromReservationDTO';
import { isValidUUID } from '@shared/verifications';

export default class FineGetFromReservationVerification {
  execute(data: IFineGetFromReservationDTO) {
    const { areaReservationId, commonAreaId, condominiumId } = data;

    if (!areaReservationId || typeof areaReservationId !== 'string' || !isValidUUID(areaReservationId))
      throw new AppError('Reserva inválida', 400);

    if (!commonAreaId || typeof commonAreaId !== 'string' || !isValidUUID(commonAreaId))
      throw new AppError('Área comum inválida', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Condomínio inválido', 400);
  }
}
