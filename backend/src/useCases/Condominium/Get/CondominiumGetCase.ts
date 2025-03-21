import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumGetDTO from './ICondominiumGetDTO';
import Condominiums from '@entities/Condominiums';
import AppError from '@errors/AppError';

export default class CondominiumGetCase {
  constructor(private condominiumsRepository: ICondominiumsRepository) {}

  async execute(data: ICondominiumGetDTO): Promise<Condominiums> {
    const { id } = data;

    const condDb = await this.condominiumsRepository.findById(id);
    if (!condDb) throw new AppError('Condominio não existe', 404);

    return condDb;
  }
}
