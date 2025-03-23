import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumEditDTO from './ICondominiumEditDTO';
import Condominiums from '@entities/Condominiums';
import AppError from '@errors/AppError';

export default class CondominiumEditCase {
  constructor(private condominiumsRepository: ICondominiumsRepository) {}

  async execute(data: ICondominiumEditDTO): Promise<Condominiums> {
    const { userID, idCondominium, name, email, phoneNumber, monthlyQuota } = data;

    // Validar se o condomínio existe
    const condDb = await this.condominiumsRepository.findById(idCondominium);
    if (!condDb) throw new AppError('Condomínio não encontrado!', 404);

    if (userID != condDb.adminId)
        throw new AppError ('Não pode atualizar este condominio', 401);

    // Validar email do condomínio
    if (email && email !== condDb.email) {
      const existingCondominium = await this.condominiumsRepository.findByEmail(
        email
      );
      if (existingCondominium && existingCondominium.id !== idCondominium) {
        throw new AppError('Email já está a ser utilizado', 400);
      }
      condDb.email = email;
    }

    // só fazer caso passe os campos
    if (name) condDb.name = name;
    if (phoneNumber) condDb.phoneNumber = phoneNumber;
    if (monthlyQuota) condDb.monthlyQuota = monthlyQuota;

    await this.condominiumsRepository.edit(condDb);
    return condDb;
  }
}
