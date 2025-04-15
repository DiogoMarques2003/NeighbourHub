import { isValidUUID } from '@shared/verifications';
import IDeleteOrdersWorkDTO from './IDeleteOrdersWorkDTO';
import AppError from '@errors/AppError';

export default class DeleteOrdersWorkVerifications {
  execute(data: IDeleteOrdersWorkDTO) {
    const { condominiumId, orderId, orderWorkId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id de condominio inválido', 400);

    if (!orderId || typeof orderId !== 'string' || !isValidUUID(orderId))
      throw new AppError('Id de ordem inválido', 400);

    if (!orderWorkId || typeof orderWorkId !== 'string' || !isValidUUID(orderWorkId))
      throw new AppError('Id da atualização do pedido inválido', 400);
  }
}
