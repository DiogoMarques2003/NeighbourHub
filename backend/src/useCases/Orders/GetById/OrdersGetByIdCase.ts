import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrdersGetByIdDTO from './IOrdersGetByIdDTO';
import OrdersWithUserData from 'src/@types/OrdersWithUserData';
import AppError from '@errors/AppError';
import generatePathToFile from '@shared/generatePathToFile';

export default class OrdersGetByIdCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IOrdersGetByIdDTO): Promise<OrdersWithUserData> {
    const { condominiumId, orderId, userId } = data;

    const condDb = await this.condominiumRepository.findById(condominiumId);
    if (!condDb) throw new AppError('Condomínio não existe!', 404);

    const userAddress = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!userAddress && condDb.adminId !== userId) throw new AppError('Utilizador não pertence ao condomínio!', 401);

    const order = await this.ordersRepository.findByIdWithUserData(orderId);
    if (!order) throw new AppError('Ordem não existe!', 404);
    if (order.condominiumId !== condominiumId) throw new AppError('Ordem não pertence ao condomínio!', 401);

    if (order.user.foto) order.user.foto = generatePathToFile(order.user.foto);
    else delete order.user.foto;
    if (!order.lastOrder) delete order.lastOrder;
    if (!order.startDate) delete order.startDate;
    if (!order.endDate) delete order.endDate;
    if (!order.votingDeadline) delete order.votingDeadline;

    return order;
  }
}
