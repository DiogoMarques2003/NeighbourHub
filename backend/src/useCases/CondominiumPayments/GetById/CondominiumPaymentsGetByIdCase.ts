import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumPaymentsRepository from '@repositories/ICondominiumPaymentsRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumPaymentsGetByIdDTO from './ICondominiumPaymentsGetByIdDTO';
import CondominiumPayments from '@entities/CondominiumPayments';
import AppError from '@errors/AppError';

export default class CondominiumPaymentsGetByIdCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private condominiumPaymentsRepository: ICondominiumPaymentsRepository
  ) {}

  async execute(data: ICondominiumPaymentsGetByIdDTO): Promise<CondominiumPayments> {
    const { condominiumId, condominiumPaymentId, userId } = data;

    //Validar Condominio
    const condominiumDb = await this.condominiumRepository.findById(condominiumId);
    if (!condominiumDb) throw new AppError('Condominio inexistente', 404);

    //Validar Pagamento
    const condominiumPaymentDb = await this.condominiumPaymentsRepository.findById(condominiumPaymentId);
    if (!condominiumPaymentDb) throw new AppError('Pagamento inexistente', 404);

    const addresseDb = await this.addressesRepository.findById(condominiumPaymentDb.addressId);
    if (!addresseDb || addresseDb.condominiumId !== condominiumId)
      throw new AppError('Endereço não pertence ao condomínio', 401);

    if (condominiumDb.adminId !== userId && addresseDb.userId !== userId)
      throw new AppError('Não pode consultar este papamento', 401);

    if (!condominiumPaymentDb.areaReservationId) delete condominiumPaymentDb.areaReservationId;

    return condominiumPaymentDb;
  }
}
