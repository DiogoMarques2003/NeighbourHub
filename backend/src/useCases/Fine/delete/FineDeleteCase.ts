import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IFineRepository from '@repositories/IFineRepository';
import IFineDeleteDTO from './IFineDeleteDTO';
import AppError from '@errors/AppError';

export default class FineDeleteCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private areaReservationRepository: IAreaReservationsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private fineRepository: IFineRepository
  ) {}

  async execute(data: IFineDeleteDTO): Promise<boolean> {
    const { areaReservationId, commonAreaId, condominiumId, fineId, userId } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);
    if (condominium.adminId !== userId)
      throw new AppError('Somente o administrador do condomínio pode apagar multas', 403);

    const commonArea = await this.commonAreasRepository.findById(commonAreaId);
    if (!commonArea) throw new AppError('Área comum não encontrada', 404);
    if (commonArea.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 403);

    const areaReservation = await this.areaReservationRepository.findById(areaReservationId);
    if (!areaReservation) throw new AppError('Reserva não encontrada', 404);
    if (areaReservation.areaId !== commonAreaId) throw new AppError('Reserva não pertence ao condomínio', 403);

    const fineDb = await this.fineRepository.findById(fineId);
    if (!fineDb) throw new AppError('Multa não encontrada', 404);
    if (fineDb.areaReservationId !== areaReservationId) throw new AppError('Multa não pertence à reserva', 403);

    return this.fineRepository.delete(fineId);
  }
}
