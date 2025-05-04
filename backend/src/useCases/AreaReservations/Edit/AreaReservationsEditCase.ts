import IAddressesRepository from '@repositories/IAddressesRepository';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IAreaReservationsEditDTO from './IAreaReservationsEditDTO';
import AppError from '@errors/AppError';
import { STATUS_RESERV_PENDING } from '@constants/status';

export default class AreaReservationsEditCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private addressesRepository: IAddressesRepository,
    private areaReservationsRepository: IAreaReservationsRepository
  ) {}

  async execute(data: IAreaReservationsEditDTO) {
    const { areaId, condominiumId, endDate, reservationId, startDate, status, userId } = data;

    const condominium = await this.condominiumsRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const area = await this.commonAreasRepository.findById(areaId);
    if (!area) throw new AppError('Área comum não encontrada', 404);
    if (area.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 404);

    const address = await this.addressesRepository.getByUserAndCond(userId, condominiumId);
    if (!address && condominium.adminId !== userId) throw new AppError('Não podes alterar esta reserva', 403);

    const reservation = await this.areaReservationsRepository.findById(reservationId);
    if (!reservation) throw new AppError('Reserva não encontrada', 404);
    if (reservation.areaId !== areaId) throw new AppError('Reserva não pertence à área comum', 404);
    if (address && reservation.userId !== userId && condominium.adminId !== userId)
      throw new AppError('Não tens permissão para editar esta reserva', 403);

    if (condominium.adminId !== userId && status)
      throw new AppError('Não tens permissão para alterar o estado da reserva', 403);
    if (reservation.userId !== userId && (endDate || startDate))
      throw new AppError('Não tens permissão para alterar a data da reserva', 403);

    if (status) reservation.status = status;

    if ((startDate && startDate !== reservation.startDate) || (endDate && endDate !== reservation.endDate)) {
      if (reservation.status !== STATUS_RESERV_PENDING) throw new AppError('Reserva já não pode ser editada', 403);

      if (startDate) reservation.startDate = startDate;
      if (endDate) reservation.endDate = endDate;

      const existsOtherReservation = await this.areaReservationsRepository.checkReservationDate(
        startDate,
        endDate,
        areaId,
        userId
      );
      if (existsOtherReservation) throw new AppError('Já existe uma reserva para esta data', 400);
    }

    return this.areaReservationsRepository.update(reservation);
  }
}
