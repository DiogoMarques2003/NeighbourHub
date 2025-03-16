import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IUsersRepository from '@repositories/IUsersRepository';
import ICondominiumCreateDTO from './ICondominiumCreateDTO';
import Condominiums from '@entities/Condominiums';
import AppError from '@errors/AppError';

export default class CondominiumCreateCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICondominiumCreateDTO): Promise<Condominiums> {
    const { adminId, name, email, phoneNumber, monthlyQuota } = data;

    //Validar user
    const userDb = this.usersRepository.findById(adminId);
    if (!userDb) throw new AppError('Utilizador inválido!', 401);

    //Valida email do condominio
    const condDb = await this.condominiumsRepository.findByEmail(email);
    if (condDb) throw new AppError('Email já está a ser utilizado', 400);

    const condClass = new Condominiums({
      name,
      email,
      phoneNumber,
      monthlyQuota,
      adminId,
    });

    await this.condominiumsRepository.create(condClass);
    return condClass;
  }
}
