import { isValidUUID } from '@shared/verifications';
import ICondominiumGetDTO from './ICondominiumGetDTO';
import AppError from '@errors/AppError';

export default class CondominiumGetVerifications {
  execute(data: ICondominiumGetDTO) {
    const { id } = data;

    if (!id || typeof id !== 'string' || !isValidUUID(id)) {
      throw new AppError('Id inválido', 400);
    }
  }
}
