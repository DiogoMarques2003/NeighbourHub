import AppError from '@errors/AppError';
import IServicesCreateDTO from './IServicesCreateDTO';

export default class ServicesCreateVerifications {
  execute(data: IServicesCreateDTO) {
    const { name, description, cost, ownerId, condId } = data;

    if (!name || typeof name !== 'string') throw new AppError('Nome inválido', 400);

    if (typeof description !== 'string') throw new AppError('Descrição inválida', 400);

    if (cost && (typeof cost !== 'number' || cost < 0)) throw new AppError('Custo inválido', 400);

    if (!condId || typeof condId !== 'string') throw new AppError('Id do condominio inválido', 400);

    if (!ownerId || typeof ownerId !== 'string') throw new AppError('Id do utilizador inválido', 400);
  }
}
