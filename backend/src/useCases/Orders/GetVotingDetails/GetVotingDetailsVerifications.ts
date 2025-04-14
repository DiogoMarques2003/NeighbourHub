import { isValidUUID } from '@shared/verifications';
import IGetVotingDetailsDTO from './IGetVotingDetailsDTO';
import AppError from '@errors/AppError';

export default class GetVotingDetailsVerifications {
  execute(data: IGetVotingDetailsDTO) {
    const { condominiumId, orderId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id de condomínio inválido!', 400);

    if (!orderId || typeof orderId !== 'string' || !isValidUUID(orderId))
      throw new AppError('Id do pedido inválido!', 400);
  }
}
