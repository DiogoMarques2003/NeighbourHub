import { isValidUUID } from '@shared/verifications';
import IAreaReservationsEditDTO from './IAreaReservationsEditDTO';
import AppError from '@errors/AppError';
import { STATUS_RESERV } from '@constants/status';

export default class AreaReservationsEditVerifications {
  execute(data: IAreaReservationsEditDTO) {
    const { areaId, condominiumId, endDate, reservationId, startDate, status } = data;

    if (!areaId || typeof areaId !== 'string' || !isValidUUID(areaId)) throw new AppError('Id da área inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!reservationId || typeof reservationId !== 'string' || !isValidUUID(reservationId))
      throw new AppError('Id da reserva inválido', 400);

    if (status && (typeof status !== 'string' || !STATUS_RESERV.includes(status)))
      throw new AppError('Status inválido', 400);

    if (startDate) {
      if (typeof startDate !== 'string' || new Date() > new Date(startDate)) throw new AppError('Data inválida', 400);

      data.startDate = new Date(startDate);
    }

    if (endDate) {
      if (typeof endDate !== 'string' || new Date() > new Date(endDate)) throw new AppError('Data inválida', 400);

      data.endDate = new Date(endDate);
    }

    if (data.startDate && data.endDate) {
      if (data.startDate >= data.endDate) throw new AppError('Data inválida', 400);

      if (
        data.startDate.getFullYear() !== data.endDate.getFullYear() ||
        data.startDate.getMonth() !== data.endDate.getMonth() ||
        data.startDate.getDate() !== data.endDate.getDate()
      )
        throw new AppError('Reserva possui mais de um dia', 400);
    }
  }
}
