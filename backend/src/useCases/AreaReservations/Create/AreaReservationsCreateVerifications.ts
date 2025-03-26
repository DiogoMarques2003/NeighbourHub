import AppError from '@errors/AppError';
import IAreaReservationsDTO from './AreaReservationsCreateDTO';

export default class AreaReservationsVerifications {
  execute(data: IAreaReservationsDTO) {
    const { userId, condId, areaId, startDate, endDate } = data;

    if (!userId || typeof userId !== 'string') {
      throw new AppError('Id do user inválido', 400);
    }

    if (!condId || typeof condId !== 'string') {
      throw new AppError('Id do condominio inválido', 400);
    }

    if (!areaId || typeof areaId !== 'string') {
      throw new AppError('Id espaço comum inválido', 400);
    }

    if (!startDate || typeof startDate !== 'string' || new Date() > new Date(startDate))
      throw new AppError('Data inválida', 400);

    data.startDate = new Date(startDate);

    if (!endDate || typeof endDate !== 'string' || new Date() > new Date(endDate))
      throw new AppError('Data inválida', 400);

    data.endDate = new Date(endDate);

    if (data.startDate >= data.endDate) throw new AppError('Data inválida', 400);
  }
}
