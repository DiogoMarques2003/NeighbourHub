import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrdersGetDTO from './IOrdersGetDTO';
import Orders from '@entities/Orders';
import { Prisma } from '@prismaClient/client';
import AppError from '@errors/AppError';

export default class OrdersGetCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IOrdersGetDTO): Promise<DataPagination<Orders[]>> {
    const { condominiumId, status, urgency, pageNumber, pageSize, userId } = data;

    const condDb = await this.condominiumRepository.findById(condominiumId);
    if (!condDb) throw new AppError('Condomínio não existe!', 404);

    const userAddress = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!userAddress && condDb.adminId !== userId) throw new AppError('Utilizador não pertence ao condomínio!', 401);

    const filters: Prisma.OrdersWhereInput = {
      condominiumId,
    };

    if (status) filters.status = status;
    if (urgency) filters.urgency = urgency;

    const count = await this.ordersRepository.countWithFilters(filters);
    if (!count) throw new AppError('Não existem ordens!', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida!', 404);

    const orders = await this.ordersRepository.getWithPagination(pageSize, pageNumber, filters);

    return { data: orders, pages, actualPage: pageNumber, nRecords: count };
  }
}
