import { isValidUUID } from '@shared/verifications';
import IOrdersEditDTO from './IOrdersEditDTO';
import { STATUS_ORDER } from '@constants/status';
import { URGENCY_LEVELS } from '@constants/urgency';
import AppError from '@errors/AppError';

export default class OrdersEditVerifications {
  execute(data: IOrdersEditDTO) {
    const { condominiumId, orderId, description, title, status, urgency } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id de condomínio inválido!', 400);

    if (!orderId || typeof orderId !== 'string' || !isValidUUID(orderId))
      throw new AppError('Id de ordem inválido!', 400);

    if (description && typeof description !== 'string') throw new AppError('Descrição inválida!', 400);

    if (title && (typeof title !== 'string' || title.length > 25))
      throw new AppError('Título inválido, so pode ter 25 caracteres', 400);

    if (status && (typeof status !== 'string' || !STATUS_ORDER.includes(status)))
      throw new AppError('Estado inválido!', 400);

    if (urgency && (typeof urgency !== 'string' || !URGENCY_LEVELS.includes(urgency)))
      throw new AppError('Urgência inválida!', 400);
  }
}
