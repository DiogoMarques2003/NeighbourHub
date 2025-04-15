import { isValidUUID } from '@shared/verifications';
import IServiceReviewsEditDTO from './IServiceReviewsEditDTO';
import AppError from '@errors/AppError';

export default class ServiceReviewsEditVerifications {
  execute(data: IServiceReviewsEditDTO) {
    const { condominiumId, serviceId, serviceRequestId, serviceReviewId, comment, rating } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Condominio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Serviço inválido', 400);

    if (!serviceRequestId || typeof serviceRequestId !== 'string' || !isValidUUID(serviceRequestId))
      throw new AppError('Pedido de serviço inválido', 400);

    if (!serviceReviewId || typeof serviceReviewId !== 'string' || !isValidUUID(serviceReviewId))
      throw new AppError('Avaliação inválida', 400);

    if (comment && typeof comment !== 'string') throw new AppError('Comentário inválido', 400);

    if (typeof rating !== 'undefined' && (typeof rating !== 'number' || rating < 0 || rating > 5))
      throw new AppError('Avaliação inválida', 400);
  }
}
