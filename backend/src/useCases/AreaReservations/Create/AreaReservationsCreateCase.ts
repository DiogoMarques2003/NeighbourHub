import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IAreaReservationsDTO from './AreaReservationsCreateDTO';
import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import stringToHours from '@shared/convertStringToHours';
import AreaReservations from '@entities/AreaReservations';
import { STATUS_RESERV_PENDING } from '@constants/status';
import IUsersRepository from '@repositories/IUsersRepository';
import IMailProvider from '@providers/IMailProvider';
import { resolve } from 'path';
import { EMAILS_PATH } from '@constants/filesPaths';
import dateFormat from '@shared/dateFormat';

export default class AreaReservationsCreateCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private addressesRepository: IAddressesRepository,
    private areaReservationsRepository: IAreaReservationsRepository,
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IAreaReservationsDTO) {
    const { userId, condId, areaId, startDate, endDate } = data;

    //Get User
    const userDb = await this.userRepository.findById(userId);
    if (!userDb) throw new AppError('Utilizador não encontrado', 401);

    //Valida condominio
    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    //Valida Espaço no condominio
    const areaDb = await this.commonAreasRepository.findById(areaId);
    if (!areaDb || areaDb.condominiumId !== condId) throw new AppError('Espaço comum inexistente', 404);

    //Valida User no condominio
    const userCondDb = await this.addressesRepository.getByUserAndCond(userId, condId);
    if (!userCondDb) throw new AppError('Não faz parte do condomínio', 403);

    //Valida Reservas
    const reservaDb = await this.areaReservationsRepository.checkReservationDate(startDate, endDate, areaId);
    if (reservaDb) throw new AppError('Já existe reservas marcadas neste horario', 400);

    //datas request
    const startTime = stringToHours(
      `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`
    );
    const endTime = stringToHours(
      `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`
    );

    //datas bd
    const startTimeDb = stringToHours(areaDb.startSchedule);
    const endTimeDb = stringToHours(areaDb.endSchedule);

    //Compara horarios
    if (startTime < startTimeDb || endTime > endTimeDb) throw new AppError('Horário inválido', 400);

    const areaReservationsClass = new AreaReservations({
      startDate,
      endDate,
      areaId,
      status: STATUS_RESERV_PENDING,
      userId,
    });

    await this.areaReservationsRepository.create(areaReservationsClass);

    await this.mailProvider.sendMail(
      condDb.email,
      [userDb.email],
      process.env.MAIL_FROM,
      'Novo Pedido',
      resolve(EMAILS_PATH, 'newAreaReservation.hbs'),
      {
        condominiumName: condDb.name,
        userName: userDb.name,
        startDate: dateFormat(startDate),
        endDate: dateFormat(endDate),
        commonArea: areaDb.name,
        adminPanelUrl: `https://neighbourhub.diogomarques.dev/condominiums/${condId}/commonarea/${areaId}/reservation/${areaReservationsClass.id}`,
      }
    );

    return areaReservationsClass;
  }
}
