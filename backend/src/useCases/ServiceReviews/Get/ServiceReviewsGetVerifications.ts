import { isValidUUID } from '@shared/verifications';
import IServiceReviewsGetDTO from './IServiceReviewsGetDTO';
import AppError from '@errors/AppError';
import { ORDER_BY, ORDER_BY_DESC, REVIEW_SORT_BY, REVIEW_SORT_BY_CREATED_AT } from '@constants/sort';

export default class ServiceReviewsGetVerifications {
  execute(data: IServiceReviewsGetDTO) {
    const { condominiumId, pageNumber, pageSize, serviceId, sortBy, sortOrder } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);
    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Id do serviço inválido', 400);

    if (!pageNumber || typeof pageNumber !== 'number' || pageNumber <= 0) data.pageNumber = 1;
    if (!pageSize || typeof pageSize !== 'number' || pageSize <= 0) data.pageSize = 5;

    if (!sortBy || typeof sortBy !== 'string' || !REVIEW_SORT_BY.includes(sortBy))
      data.sortBy = REVIEW_SORT_BY_CREATED_AT;
    if (!sortOrder || typeof sortOrder !== 'string' || !ORDER_BY.includes(sortOrder)) data.sortOrder = ORDER_BY_DESC;
  }
}
