import AppError from '@errors/AppError';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServicesRequestDTO from './IServicesRequestDTO';
import IAddressesRepository from '@repositories/IAddressesRepository';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import ServiceRequests from '@entities/ServiceRequests';
import { STATUS_REQ_PENDING } from '@constants/status';
import { EMAILS_PATH } from '@constants/filesPaths';
import IUsersRepository from '@repositories/IUsersRepository';
import IMailProvider from '@providers/IMailProvider';
import { resolve } from 'path';

export default class ServicesRequestCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
    private serviceReqRepo: IServiceRequestsRepository,
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IServicesRequestDTO) {
    const { condId, serviceId, userId } = data;

    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    //Valida User no condominio
    const userCondDb = await this.addressRepository.getByUserAndCond(userId, condId);
    if (!userCondDb && condDb.adminId !== userId) throw new AppError('Não faz parte do condomínio', 403);

    const serviceConDb = await this.servicesRepository.findById(serviceId);
    if (!serviceConDb) throw new AppError('Serviço não existe', 404);

    if (serviceConDb.ownerId === userId) throw new AppError('Este serviço é seu', 403);

    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError('Utilizador não encontrado', 401);

    const ownerEmail = await this.userRepository.findById(serviceConDb.ownerId);
    if (!ownerEmail) throw new AppError('Erro ao obter dono do serviço', 500);

    const service = new ServiceRequests({
      status: STATUS_REQ_PENDING,
      serviceId,
      userId,
    });

    await this.serviceReqRepo.create(service);

    await this.mailProvider.sendMail(
      ownerEmail.email,
      [user.email],
      process.env.MAIL_FROM,
      'Novo Serviço Requisitado',
      resolve(EMAILS_PATH, 'newServiceRequest.hbs'),
      {
        requesterName: user.name,
        serviceDescription: serviceConDb.name,
        condominiumName: condDb.name,
        providerPanelUrl: `https://neighbourhub.diogomarques.dev/condominium/${condId}/services/${serviceId}/request/${service.id}`,
      }
    );

    return service;
  }
}
