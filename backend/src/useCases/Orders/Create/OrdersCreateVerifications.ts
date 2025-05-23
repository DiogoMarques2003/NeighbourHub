import AppError from '@errors/AppError';
import IOrdersCreateDTO from './IOrdersCreateDTO';
import { URGENCY_LEVELS } from '@constants/urgency';
import { STATUS_ORDER } from '@constants/status';
import { isValidUUID } from '@shared/verifications';

export default class OrdersCreateVerifications {
  execute(data: IOrdersCreateDTO) {
    const { title, description, urgency, lastOrder, condominiumId } = data;

    if (!title || typeof title !== 'string' || title.length > 25)
      throw new AppError('Título inválido, so pode ter 25 caracteres', 400);

    if (!description || typeof description !== 'string') throw new AppError('Descrição inválida', 400);

    if (!urgency || typeof urgency !== 'string' || !URGENCY_LEVELS.includes(urgency))
      throw new AppError('Urgência inválida', 400);

    if (lastOrder && (typeof lastOrder !== 'string' || !isValidUUID(lastOrder)))
      throw new AppError('Último pedido inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id condomínio inválido', 400);
  }
}
