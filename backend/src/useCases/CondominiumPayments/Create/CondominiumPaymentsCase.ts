import IAddressesRepository from '@repositories/IAddressesRepository';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICondominiumPaymentsRepository from '@repositories/ICondominiumPaymentsRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumPaymentsCreateDTO from './ICondominiumPaymentsCreateDTO';
import AppError from '@errors/AppError';
import CondominiumPayments from '@entities/CondominiumPayments';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';

export default class CondominiumPaymentsCreateCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private condominiumPaymentsRepository: ICondominiumPaymentsRepository,
    private areaReservationsRepository: IAreaReservationsRepository,
    private commonAreasRepository: ICommonAreasRepository
  ) {}

  async execute(data: ICondominiumPaymentsCreateDTO): Promise<CondominiumPayments> {
    const { value, date, paymentType, addressId, areaReservationId, condominiumId, userId } = data;

    //Validar Condominio
    const condominiumDb = await this.condominiumRepository.findById(condominiumId);
    if (!condominiumDb) throw new AppError('Condominio inexistente', 404);
    if (condominiumDb.adminId !== userId) throw new AppError('Não é administrador do condomínio', 401);

    //Validar Endereço
    const addresseDb = await this.addressesRepository.findById(addressId);
    if (!addresseDb) throw new AppError('Endereço inexistente', 404);
    if (addresseDb.condominiumId !== condominiumId) throw new AppError('Endereço não pertence ao condomínio', 401);

    const condominiuumPayment = new CondominiumPayments({
      addressId,
      date,
      paymentType,
      value,
    });

    //Se exister validar reserva
    if (areaReservationId) {
        const areaReservationDb = await this.areaReservationsRepository.findById(areaReservationId);
        if (!areaReservationDb) throw new AppError('Reserva inexistente', 404);
        if (areaReservationDb.userId !== addresseDb.userId) throw new AppError('Reserva não pertence ao utilizador do endereço', 401);

        const commonAreaDb = await this.commonAreasRepository.findById(areaReservationDb.areaId);
        if (!commonAreaDb) throw new AppError('Área comum inexistente', 404);
        if (commonAreaDb.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 401);

        condominiuumPayment.areaReservationId = areaReservationId;
    }

    // Criar pagamento
    await this.condominiumPaymentsRepository.create(condominiuumPayment);

    return condominiuumPayment;
  }
}
