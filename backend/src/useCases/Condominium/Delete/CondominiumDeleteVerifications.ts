import AppError from '@errors/AppError';
import ICondominiumDeleteDTO from './ICondominiumDeleteDTO';
import { isValidUUID } from '@shared/verifications';

export default class CondominiumDeleteVerifications {
  execute(data: ICondominiumDeleteDTO) {
    const { condominiumID } = data;

    if (!condominiumID || typeof condominiumID !== 'string' || !isValidUUID(condominiumID))
      throw new AppError('Condomínio inválido', 400);
  }
}
