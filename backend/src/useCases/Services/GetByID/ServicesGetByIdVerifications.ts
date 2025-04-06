import AppError from '@errors/AppError';
import IServicesGetByIdDTO from './IServicesGetByIdDTO';

export default class ServicesGetByIdVerifications {
  execute(data: IServicesGetByIdDTO) {
    const { condId, serviceId } = data;

    if (!condId || typeof condId !== 'string') throw new AppError('Id do condominio inválido', 400);

    if (!serviceId || typeof serviceId !== 'string') throw new AppError('Id do serviço inválido', 400);
  }
}
