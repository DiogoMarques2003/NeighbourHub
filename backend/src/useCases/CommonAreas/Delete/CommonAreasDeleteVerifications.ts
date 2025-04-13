import { isValidUUID } from '@shared/verifications';
import ICommonAreasDeleteDTO from './ICommonAreasDeleteDTO';
import AppError from '@errors/AppError';

export default class CommonAreasDeleteVerifications {
  execute(data: ICommonAreasDeleteDTO) {
    const { commonAreaId, condominiumId } = data;

    if (!commonAreaId || typeof commonAreaId !== 'string' || !isValidUUID(commonAreaId))
      throw new AppError('Id da área comum inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);
  }
}
