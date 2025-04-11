import AppError from '@errors/AppError';
import IServicesReviewDTO from './IServicesReviewDTO';
import { isValidUUID } from '@shared/verifications';

export default class ServicesReviewVerifications {
  execute(data: IServicesReviewDTO) {
    const { condId, serviceId, rating, comment, requestId } = data;

    if (!condId || typeof condId !== 'string' || !isValidUUID(condId))
      throw new AppError('Id do condominio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Id do serviço inválido', 400);

    if (typeof rating !== 'number' || rating < 0 || rating > 5) throw new AppError('Rating inválido', 400);

    if (!comment || typeof comment !== 'string') throw new AppError('Comentário Inválido', 400);

    if (!requestId || typeof requestId !== 'string' || !isValidUUID(requestId))
      throw new AppError('Id de requisição inválido', 400);
  }
}
