import AppError from '@errors/AppError';
import IServicesEditDTO from './IServicesEditDTO';
import { isValidUUID } from '@shared/verifications';

export default class ServicesEditVerifications {
  execute(data: IServicesEditDTO) {
    const { name, description, cost, ownerId, condId } = data;

    if (name && typeof name !== 'string') throw new AppError('Nome inválido', 400);

    if (description && typeof description !== 'string') throw new AppError('Descrição inválida', 400);

    if (cost && typeof cost !== 'number') throw new AppError('Custo inválido', 400);

    if (!condId || typeof condId !== 'string' || !isValidUUID(condId))
      throw new AppError('Id do condominio inválido', 400);

    if (!ownerId || typeof ownerId !== 'string' || !isValidUUID(ownerId))
      throw new AppError('Id do utilizador inválido', 400);
  }
}
