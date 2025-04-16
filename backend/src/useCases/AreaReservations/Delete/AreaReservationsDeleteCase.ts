import IAddressesRepository from '@repositories/IAddressesRepository';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IAreaReservationsDeleteDTO from './IAreaReservationsDeleteDTO';
import AppError from '@errors/AppError';

export default class AreaReservationsDeleteCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private addressesRepository: IAddressesRepository,
    private areaReservationsRepository: IAreaReservationsRepository
  ) {}

  async execute(data: IAreaReservationsDeleteDTO) {
    const { areaId, condominiumId, reservationId, userId } = data;

    const condominium = await this.condominiumsRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const area = await this.commonAreasRepository.findById(areaId);
    if (!area) throw new AppError('Área comum não encontrada', 404);
    if (area.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 404);

    const address = await this.addressesRepository.getByUserAndCond(userId, condominiumId);
    if (!address) throw new AppError('Não podes apagar esta reserva', 403);

    const reservation = await this.areaReservationsRepository.findById(reservationId);
    if (!reservation) throw new AppError('Reserva não encontrada', 404);
    if (reservation.areaId !== areaId) throw new AppError('Reserva não pertence à área comum', 404);
    if (reservation.userId !== userId)
      throw new AppError('Não tens permissão para apagar esta reserva', 403);

    return this.areaReservationsRepository.delete(reservationId);
  }
}
