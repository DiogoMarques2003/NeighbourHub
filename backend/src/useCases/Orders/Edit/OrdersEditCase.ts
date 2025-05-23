import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrdersEditDTO from './IOrdersEditDTO';
import Orders from '@entities/Orders';
import AppError from '@errors/AppError';
import { STATUS_ORDER_VOTING } from '@constants/status';

export default class OrdersEditCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private addressRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository
  ) {}

  async execute(data: IOrdersEditDTO): Promise<Orders> {
    const { title, condominiumId, orderId, userId, description, status, urgency } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!address && condominium.adminId !== userId) throw new AppError('Não fazes parte deste condomínio', 403);

    const order = await this.ordersRepository.findById(orderId);
    if (!order) throw new AppError('Ordem não encontrada', 404);

    // só admin ou dono do pedido podem editar, não permitindo outros morados do condomínio
    if (address && condominium.adminId !== userId && order.userId !== userId)
      throw new AppError('Não podes editar este pedido', 403);

    if (condominium.adminId === userId && order.userId !== userId && (description || urgency))
      throw new AppError('Como admin e não dono do pedido, não podes alterar a descrição nem a urgência', 403);

    // como dono do pedido e não admin, a alteração do status não é permitida.
    if (order.userId === userId && condominium.adminId !== userId && status)
      throw new AppError('Não podes editar o estado deste pedido', 403);

    // Para o update do pedido apenas são usados os campos status, description e urgency.
    if (status) {
      // alteração para o estado de voting é feito através de outra rota
      if (status === STATUS_ORDER_VOTING) throw new AppError('Não podes editar o estado para votação', 400);
      order.status = status;
    }
    if (description) order.description = description;
    if (urgency) order.urgency = urgency;
    if (title) order.title = title;
    await this.ordersRepository.update(order);

    return order;
  }
}
