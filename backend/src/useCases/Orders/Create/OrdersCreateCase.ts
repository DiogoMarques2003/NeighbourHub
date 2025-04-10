import IAddressesRepository from '@repositories/IAddressesRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrdersCreateDTO from './IOrdersCreateDTO';
import Orders from '@entities/Orders';
import AppError from '@errors/AppError';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IUsersRepository from '@repositories/IUsersRepository';
import IMailProvider from '@providers/IMailProvider';
import { resolve } from 'path';
import { EMAILS_PATH } from '@constants/filesPaths';
import { STATUS_ORDER_PENDING } from '@constants/status';

export default class OrdersCreateCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private addressRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository,
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IOrdersCreateDTO): Promise<Orders> {
    const { description, urgency, lastOrder, userId, condominiumId } = data;

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!address) throw new AppError('Não fazes parte deste condomínio', 403);

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError('Utilizador não encontrado', 403);

    const orderClass = new Orders({
      description,
      urgency,
      status: STATUS_ORDER_PENDING,
      userId,
      condominiumId,
    });

    if (lastOrder) orderClass.lastOrder = lastOrder;

    await this.ordersRepository.create(orderClass);

    await this.mailProvider.sendMail(
      condominium.email,
      [user.email],
      process.env.MAIL_FROM,
      'Novo Pedido',
      resolve(EMAILS_PATH, 'newOrders.hbs'),
      {
        condominiumName: condominium.name,
        userName: user.name,
        orderDescription: description,
        adminPanelUrl: `https://neighbourhub.diogomarques.dev/condominiums/${condominiumId}/order/${orderClass.id}`,
      }
    );

    return orderClass;
  }
}
