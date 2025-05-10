import { isValidUUID } from '@shared/verifications';
import IOrdersGetDTO from './IOrdersGetDTO';
import { STATUS_ORDER } from '@constants/status';
import { URGENCY_LEVELS } from '@constants/urgency';
import AppError from '@errors/AppError';

export default class OrdersGetVerifications {
  execute(data: IOrdersGetDTO) {
    const { condominiumId, status, urgency, pageNumber, pageSize } = data;

    if (
      !condominiumId ||
      typeof condominiumId !== 'string' ||
      !isValidUUID(condominiumId)
    )
      throw new AppError('Id de condomínio inválido!', 400);

    if (status && typeof status !== 'string' && !STATUS_ORDER.includes(status))
      throw new AppError('Status inválido!', 400);

    if (
      urgency &&
      (typeof urgency !== 'string' || !URGENCY_LEVELS.includes(urgency))
    )
      throw new AppError('Urgência inválida!', 400);

    if(pageSize < 1 || pageNumber < 1)
      throw new AppError('Paginação inválida!', 400);

    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

    if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
  }
}
