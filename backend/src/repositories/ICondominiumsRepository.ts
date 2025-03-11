import Condominiums from '@entities/Condominiums';

export default interface ICondominiumsRepository {
  findById(id: string): Promise<Condominiums | null>;
  create(condominium: Condominiums): Promise<Condominiums>;
}
