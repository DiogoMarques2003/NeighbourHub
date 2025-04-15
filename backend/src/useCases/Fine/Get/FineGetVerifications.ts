import { isValidUUID } from '@shared/verifications';
import IFineGetDTO from './IFineGetDTO';
import AppError from '@errors/AppError';
import { FINE_SORT_BY, FINE_SORT_BY_CREATED_AT, ORDER_BY, ORDER_BY_ASC } from '@constants/sort';

export default class FineGetVerifications {
  execute(data: IFineGetDTO) {
    const { condominiumId, fromUserId, maxValue, minValue, pageNumber, pageSize, sortBy, sortOrder } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (fromUserId && (typeof fromUserId !== 'string' || !isValidUUID(fromUserId)))
      throw new AppError('Id do usuário inválido', 400);

    if (!pageNumber || typeof pageNumber !== 'number' || pageNumber < 0) data.pageNumber = 1;
    if (!pageSize || typeof pageSize !== 'number' || pageSize < 0) data.pageSize = 25;
    if (!sortBy || typeof sortBy !== 'string' || !FINE_SORT_BY.includes(sortBy)) data.sortBy = FINE_SORT_BY_CREATED_AT;
    if (!sortOrder || typeof sortOrder !== 'string' || !ORDER_BY.includes(sortOrder)) data.sortOrder = ORDER_BY_ASC;

    if (maxValue && typeof maxValue !== 'number') throw new AppError('Valor máximo inválido', 400);
    if (minValue && typeof minValue !== 'number') throw new AppError('Valor mínimo inválido', 400);

    if (maxValue && minValue && maxValue < minValue)
      throw new AppError('Valor máximo não pode ser menor que o mínimo', 400);
  }
}
