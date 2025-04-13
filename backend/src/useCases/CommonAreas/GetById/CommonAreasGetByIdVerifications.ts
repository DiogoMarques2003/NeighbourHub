import AppError from '@errors/AppError';
import ICommonAreasGetByIdDTO from './ICommonAreasGetByIdDTO';
import { isValidUUID } from '@shared/verifications';

export default class CommonAreasGetByIdVerifications {
  execute(data: ICommonAreasGetByIdDTO) {
    const { commonAreaId, condominiumId } = data;

    if (!commonAreaId || typeof commonAreaId !== 'string' || !isValidUUID(commonAreaId))
      throw new AppError('Id de área comum inválido!', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id de condomínio inválido!', 400);
  }
}
