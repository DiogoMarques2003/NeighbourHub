import { isValidUUID } from '@shared/verifications';
import IAreaReservationsGetByIdDTO from './IAreaReservationsGetByIdDTO';
import AppError from '@errors/AppError';

export default class AreaReservationsGetByIdVerifications {
  execute(data: IAreaReservationsGetByIdDTO) {
    const { areaId, condominiumId, reservationId } = data;

    if (!areaId || typeof areaId !== 'string' || !isValidUUID(areaId)) throw new AppError('Id da área inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!reservationId || typeof reservationId !== 'string' || !isValidUUID(reservationId))
      throw new AppError('Id da reserva inválido', 400);
  }
}
