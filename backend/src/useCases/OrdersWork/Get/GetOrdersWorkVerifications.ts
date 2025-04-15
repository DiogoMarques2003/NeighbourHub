import { isValidUUID } from '@shared/verifications';
import IGetOrdersWorkDTO from './IGetOrdersWorkDTO';
import AppError from '@errors/AppError';
import { STATUS_ORDERWORK } from '@constants/status';

export default class GetOrdersWorkVerifications {
  execute(data: IGetOrdersWorkDTO) {
    const { condominiumId, orderId, pageNumber, pageSize, hasReport, status } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id de condomínio inválido', 400);

    if (!orderId || typeof orderId !== 'string' || !isValidUUID(orderId))
      throw new AppError('Id de pedido inválido', 400);

    if (!pageNumber || typeof pageNumber !== 'number' || pageNumber < 1) data.pageNumber = 1;
    if (!pageSize || typeof pageSize !== 'number' || pageSize < 1) data.pageSize = 25;

    if (hasReport && typeof hasReport !== 'boolean') throw new AppError('Parametro hasReport inválido', 400);

    if (status && typeof status !== 'string' && !STATUS_ORDERWORK.includes(status))
      throw new AppError('Status inválido', 400);
  }
}
