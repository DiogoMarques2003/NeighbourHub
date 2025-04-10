import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumPaymentsRepository from '@repositories/ICondominiumPaymentsRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumPaymentsEditDTO from './ICondominiumPaymentsEditDTO';
import CondominiumPayments from '@entities/CondominiumPayments';
import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';

export default class CondominiumPaymentsEditCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private condominiumPaymentsRepository: ICondominiumPaymentsRepository,
    private areaReservationsRepository: IAreaReservationsRepository,
    private commonAreasRepository: ICommonAreasRepository
  ) {}

  async execute(data: ICondominiumPaymentsEditDTO): Promise<CondominiumPayments> {
    const { value, date, paymentType, areaReservationId, condominiumId, userId, condominiumPaymentId } = data;

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

    if (value) condominiumPaymentDb.value = value;
    if (date) condominiumPaymentDb.date = date;
    if (paymentType) condominiumPaymentDb.paymentType = paymentType;

    if (areaReservationId && areaReservationId !== condominiumPaymentDb.areaReservationId) {
      const areaReservationDb = await this.areaReservationsRepository.findById(areaReservationId);
      if (!areaReservationDb) throw new AppError('Reserva inexistente', 404);
      if (areaReservationDb.userId !== addresseDb.userId)
        throw new AppError('Reserva não pertence ao utilizador do endereço', 403);

      const commonAreaDb = await this.commonAreasRepository.findById(areaReservationDb.areaId);
      if (!commonAreaDb) throw new AppError('Área comum inexistente', 404);
      if (commonAreaDb.condominiumId !== condominiumId)
        throw new AppError('Área comum não pertence ao condomínio', 403);

      condominiumPaymentDb.areaReservationId = areaReservationId;
    }

    await this.condominiumPaymentsRepository.update(condominiumPaymentDb);

    return condominiumPaymentDb;
  }
}
