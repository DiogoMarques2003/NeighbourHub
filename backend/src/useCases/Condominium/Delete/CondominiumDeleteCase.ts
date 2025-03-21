import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IUsersRepository from '@repositories/IUsersRepository';
import ICondominiumCreateDTO from './ICondominiumDeleteDTO';
import AppError from '@errors/AppError';

export default class CondominiumCreateCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICondominiumCreateDTO): Promise<Boolean> {
    const { condominiumID, userID } = data;

    // Valida condomínio
    const condominioDb = await this.condominiumsRepository.findById(condominiumID);
    if(!condominioDb) throw new AppError('Condomínio não encontrado!', 404);

    if(userID != condominioDb.adminId) throw new AppError('Não tem autorização para eliminar o condomínio!', 403);

    await this.condominiumsRepository.deleteById(condominiumID);
    return true;
  }
}
