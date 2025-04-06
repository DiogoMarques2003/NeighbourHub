import AppError from '@errors/AppError';
import IServicesGetAllDTO from './IServicesGetAllDTO';

export default class ServicesGetAllVerifications {
  execute(data: IServicesGetAllDTO) {
    const { condId, pageSize, pageNumber } = data;

    if (!condId || typeof condId !== 'string') throw new AppError('Id do condominio inválido', 400);

    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

    if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
  }
}
