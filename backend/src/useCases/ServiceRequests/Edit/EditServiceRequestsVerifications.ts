import { isValidUUID } from '@shared/verifications';
import IEditServiceRequestsDTO from './IEditServiceRequestsDTO';
import AppError from '@errors/AppError';
import { STATUS_REQ } from '@constants/status';

export default class EditServiceRequestsVerifications {
  execute(data: IEditServiceRequestsDTO) {
    const { condominiumId, serviceId, serviceRequestId, status } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Id do serviço inválido', 400);

    if (!serviceRequestId || typeof serviceRequestId !== 'string' || !isValidUUID(serviceRequestId))
      throw new AppError('Id do pedido de serviço inválido', 400);

    if (status && (typeof status !== 'string' || !STATUS_REQ.includes(status)))
      throw new AppError('Estado inválido', 400);
  }
}
