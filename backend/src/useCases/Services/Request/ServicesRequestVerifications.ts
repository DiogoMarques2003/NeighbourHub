import AppError from '@errors/AppError';
import IServicesRequestDTO from './IServicesRequestDTO';
import { isValidUUID } from '@shared/verifications';

export default class ServicesRequestVerifications {
  execute(data: IServicesRequestDTO) {
    const { condId, serviceId } = data;

    if (!condId || typeof condId !== 'string' || !isValidUUID(condId))
      throw new AppError('Id do condominio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Id do serviço inválido', 400);
  }
}
