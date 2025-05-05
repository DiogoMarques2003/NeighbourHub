import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IFineRepository from '@repositories/IFineRepository';
import IFineCreateDTO from './IFineCreateDTO';
import { STATUS_FINE_PENDING, STATUS_RESERV_COMPLETED } from '@constants/status';
import Fine from '@entities/Fine';
import AppError from '@errors/AppError';
import IMailProvider from '@providers/IMailProvider';
import IUsersRepository from '@repositories/IUsersRepository';
import { join } from 'path';
import { EMAILS_PATH } from '@constants/filesPaths';
import dateFormat from '@shared/dateFormat';

export default class FineCreateCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private areaReservationRepository: IAreaReservationsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private fineRepository: IFineRepository,
    private mailProvider: IMailProvider,
    private userRepository: IUsersRepository
  ) {}

  async execute(data: IFineCreateDTO): Promise<Fine> {
    const { amount, areaReservationId, condominiumId, reason, userId, commonAreaId } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);
    if (condominium.adminId !== userId)
      throw new AppError('Somente o administrador do condomínio pode criar multas', 403);

    const commonArea = await this.commonAreasRepository.findById(commonAreaId);
    if (!commonArea) throw new AppError('Área comum não encontrada', 404);
    if (commonArea.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 403);

    const areaReservation = await this.areaReservationRepository.findById(areaReservationId);
    if (!areaReservation) throw new AppError('Reserva não encontrada', 404);
    if (areaReservation.areaId !== commonAreaId) throw new AppError('Reserva não pertence ao condomínio', 403);
    if (areaReservation.status !== STATUS_RESERV_COMPLETED) throw new AppError('Reserva não está concluída', 400);

    const userReservation = await this.userRepository.findById(areaReservation.userId);
    if (!userReservation) throw new AppError('Dono da reserva não encontrado', 500);

    const fine = await this.fineRepository.findByAreaReservationId(areaReservationId);
    if (fine) throw new AppError('Já existe uma multa para esta reserva', 400);

    const fineClass = new Fine({
      amount,
      reason,
      areaReservationId,
      status: STATUS_FINE_PENDING,
    });

    await this.fineRepository.create(fineClass);

    await this.mailProvider.sendMail(
      userReservation.email,
      [condominium.email],
      process.env.MAIL_FROM,
      'Nova multa gerada',
      join(EMAILS_PATH, 'newFine.hbs'),
      {
        userName: userReservation.name,
        condominiumName: condominium.name,
        commonArea: commonArea.name,
        startDate: dateFormat(areaReservation.startDate),
        endDate: dateFormat(areaReservation.endDate),
        fineReason: reason,
        fineAmount: amount,
        userPanelUrl: `https://neighbourhub.diogomarques.dev/condominium/${condominiumId}/commonarea/${commonAreaId}/reservations/${areaReservationId}/fine`,
      }
    );

    return fineClass;
  }
}
