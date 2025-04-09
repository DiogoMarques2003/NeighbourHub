import AppError from '@errors/AppError';
import ICondominiumPaymentsGetDTO from './ICondominiumPaymentsGetDTO';
import { isValidUUID } from '@shared/verifications';
import {
  CONDOMINIUM_PAYMENTS_SORT_BY,
  CONDOMINIUM_PAYMENTS_SORT_BY_DATE,
  ORDER_BY,
  ORDER_BY_ASC,
} from '@constants/sort';

export default class CondominiumPaymentsGetVerifications {
  execute(data: ICondominiumPaymentsGetDTO) {
    const {
      condominiumId,
      addressId,
      endDate,
      maxValue,
      minValue,
      pageNumber,
      pageSize,
      paymentType,
      sortBy,
      sortOrder,
      startDate,
    } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (addressId && (typeof addressId !== 'string' || !isValidUUID(addressId)))
      throw new AppError('Id do endereço inválido', 400);

    if (!pageSize || typeof pageNumber !== 'number') data.pageNumber = 1;
    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

    if (endDate) {
      if (typeof endDate !== 'object') throw new AppError('Data de fim inválida', 400);

      if (isNaN(data.endDate.getTime()) || data.endDate > new Date()) throw new AppError('Data de fim inválida', 400);
    }

    if (startDate) {
      if (typeof startDate !== 'object') throw new AppError('Data de inicio inválida', 400);

      if (isNaN(data.startDate.getTime()) || data.startDate > new Date())
        throw new AppError('Data de inicio inválida', 400);
    }

    if (startDate && endDate && startDate > endDate)
      throw new AppError('Data de inicio não pode ser maior que a data de fim', 400);

    if (maxValue && (typeof maxValue !== 'number' || maxValue <= 0)) throw new AppError('Valor máximo inválido', 400);

    if (minValue && (typeof minValue !== 'number' || minValue <= 0)) throw new AppError('Valor mínimo inválido', 400);

    if (minValue && maxValue && minValue > maxValue)
      throw new AppError('Valor mínimo não pode ser maior que o valor máximo', 400);

    if (paymentType && typeof paymentType !== 'number') throw new AppError('Tipo de pagamento inválido', 400);

    if (!sortBy || typeof sortBy !== 'string' || !CONDOMINIUM_PAYMENTS_SORT_BY.includes(sortBy))
      data.sortBy = CONDOMINIUM_PAYMENTS_SORT_BY_DATE;
    if (!sortOrder || typeof sortOrder !== 'string' || !ORDER_BY.includes(sortOrder)) data.sortOrder = ORDER_BY_ASC;
  }
}
