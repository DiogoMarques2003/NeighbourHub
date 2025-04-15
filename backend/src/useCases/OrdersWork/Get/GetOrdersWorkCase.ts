import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrderWorksRepository from '@repositories/IOrderWorksRepository';
import IGetOrdersWorkDTO from './IGetOrdersWorkDTO';
import AppError from '@errors/AppError';
import OrderWorks from '@entities/OrderWorks';
import generatePathToFile from '@shared/generatePathToFile';

export default class GetOrdersWorkCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private ordersRepository: IOrdersRepository,
    private orderWorksRepository: IOrderWorksRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IGetOrdersWorkDTO): Promise<DataPagination<OrderWorks[]>> {
    const { condominiumId, orderId, pageNumber, pageSize, userId, hasReport, status } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const addressDb = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!addressDb && condominium.adminId !== userId)
      throw new AppError('Não podes obter os atualizações do pedido', 403);

    const order = await this.ordersRepository.findById(orderId);
    if (!order) throw new AppError('Pedido não encontrado', 404);
    if (order.condominiumId !== condominiumId) throw new AppError('Pedido não pertence ao condomínio', 403);

    const count = await this.orderWorksRepository.countWithFilters(orderId, status, hasReport);
    if (!count) throw new AppError('Atualizações do pedido não encontradas', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const orderWorks = await this.orderWorksRepository.findWithFilters(
      orderId,
      pageSize,
      pageNumber,
      status,
      hasReport
    );

    for (const orderWork of orderWorks) {
      if (orderWork.reportFile) orderWork.reportFile = generatePathToFile(orderWork.reportFile);
    }

    return { data: orderWorks, pages, actualPage: pageNumber, nRecords: count };
  }
}
