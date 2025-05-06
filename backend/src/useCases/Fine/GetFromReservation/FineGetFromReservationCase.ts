import IAddressesRepository from '@repositories/IAddressesRepository';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IFineRepository from '@repositories/IFineRepository';
import IFineGetFromReservationDTO from './IFineGetFromReservationDTO';
import Fine from '@entities/Fine';
import AppError from '@errors/AppError';

export default class FineGetFromReservationCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private areaReservationRepository: IAreaReservationsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private fineRepository: IFineRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IFineGetFromReservationDTO): Promise<Fine> {
    const { areaReservationId, commonAreaId, condominiumId, userId } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!address && condominium.adminId !== userId) throw new AppError('Não pode acessar a multa', 403);

    const commonArea = await this.commonAreasRepository.findById(commonAreaId);
    if (!commonArea) throw new AppError('Área comum não encontrada', 404);
    if (commonArea.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 403);

    const areaReservation = await this.areaReservationRepository.findById(areaReservationId);
    if (!areaReservation) throw new AppError('Reserva não encontrada', 404);
    if (address && areaReservation.userId !== userId && address.userId !== userId)
      throw new AppError('Não pode acessar a multa', 403);

    return this.fineRepository.findByAreaReservationId(areaReservationId);
  }
}
