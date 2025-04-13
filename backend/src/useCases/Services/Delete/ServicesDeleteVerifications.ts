import { isValidUUID } from '@shared/verifications';
import IServicesDeleteDTO from './IServicesDeleteDTO';
import AppError from '@errors/AppError';

export default class ServicesDeleteVerifications {
  exectue(data: IServicesDeleteDTO) {
    const { condominiumId, serviceId } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condominio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string' || !isValidUUID(serviceId))
      throw new AppError('Id do serviço inválido', 400);
  }
}
