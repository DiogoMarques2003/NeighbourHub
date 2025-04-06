import { isValidUUID } from '@shared/verifications';
import IOrdersGetByIdDTO from './IOrdersGetByIdDTO';
import AppError from '@errors/AppError';

export default class OrdersGetByIdVerifications {
  execute(data: IOrdersGetByIdDTO) {
    const { condominiumId, orderId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id de condomínio inválido!', 400);

    if (!orderId || typeof orderId !== 'string' || !isValidUUID(orderId))
      throw new AppError('Id do pedido inválido!', 400);
  }
}
