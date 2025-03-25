import AppError from '@errors/AppError';
import ICommonAreasGetDTO from './ICommonAreasGetDTO';

export default class CommonAreasGetVerifications {
  execute(data: ICommonAreasGetDTO) {
    const { type, pageNumber, pageSize, condId, userId } = data;

    if (type && typeof type !== 'number')
      throw new AppError('Tipo inválido', 400);

    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 25;

    if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;

    if (!condId || typeof condId !== 'string')
      throw new AppError('Id de condomínio inválido!', 400);

    if (!userId || typeof userId !== 'string')
      throw new AppError('User id inválido!', 400);
  }
}
