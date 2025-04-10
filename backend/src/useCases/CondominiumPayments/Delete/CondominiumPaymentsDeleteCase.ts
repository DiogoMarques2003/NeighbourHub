import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumPaymentsRepository from '@repositories/ICondominiumPaymentsRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumPaymentsDeleteDTO from './ICondominiumPaymentsDeleteDTO';
import AppError from '@errors/AppError';

export default class CondominiumPaymentsDeleteCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private condominiumPaymentsRepository: ICondominiumPaymentsRepository
  ) {}

  async execute(data: ICondominiumPaymentsDeleteDTO): Promise<Boolean> {
    const { condominiumId, condominiumPaymentId, userId } = data;

    //Validar Condominio
    const condominiumDb = await this.condominiumRepository.findById(condominiumId);
    if (!condominiumDb) throw new AppError('Condominio inexistente', 404);
    if (condominiumDb.adminId !== userId) throw new AppError('Não é administrador do condomínio', 403);

    //Validar Pagamento
    const condominiumPaymentDb = await this.condominiumPaymentsRepository.findById(condominiumPaymentId);
    if (!condominiumPaymentDb) throw new AppError('Pagamento inexistente', 404);

    const addresseDb = await this.addressesRepository.findById(condominiumPaymentDb.addressId);
    if (!addresseDb || addresseDb.condominiumId !== condominiumId)
      throw new AppError('Endereço não pertence ao condomínio', 403);

    return this.condominiumPaymentsRepository.delete(condominiumPaymentDb.id);
  }
}
