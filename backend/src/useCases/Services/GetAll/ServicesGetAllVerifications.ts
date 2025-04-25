import AppError from '@errors/AppError';
import IServicesGetAllDTO from './IServicesGetAllDTO';

export default class ServicesGetAllVerifications {
  execute(data: IServicesGetAllDTO) {
    const { condId, myServices, maxReviews, minReviews, pageSize, pageNumber } = data;

    if (!condId || typeof condId !== 'string') throw new AppError('Id do condominio inválido', 400);

    if (typeof myServices !== 'boolean') data.myServices = false;

    if(minReviews && typeof minReviews === 'number' && minReviews < 0 ) throw new AppError('Valor mínimo da avaliação tem de ser superior ou igual a 0', 400);

    if (maxReviews && typeof maxReviews === 'number' && maxReviews > 5) throw new AppError('Valor máximo da avaliação tem de ser inferior ou igual a 5', 400);

    if(minReviews && maxReviews && minReviews > maxReviews) throw new AppError('Valor mínimo tem de ser inferior ao valor máximo',400);

    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

    if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
  }
}
