import { isValidUUID } from '@shared/verifications';
import IGetByIdServiceRequestsDTO from './IGetByIdServiceRequestsDTO';
import AppError from '@errors/AppError';

export default class GetByIdServiceRequestsVerifications {
  execute(data: IGetByIdServiceRequestsDTO) {
    const { condominiumId, serviceId, serviceRequestId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Id do serviço inválido', 400);

    if (!serviceRequestId || typeof serviceRequestId !== 'string' || !isValidUUID(serviceRequestId))
      throw new AppError('Id do pedido de serviço inválido', 400);
  }
}
