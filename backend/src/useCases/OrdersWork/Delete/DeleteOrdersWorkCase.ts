import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrderWorksRepository from '@repositories/IOrderWorksRepository';
import IDeleteOrdersWorkDTO from './IDeleteOrdersWorkDTO';
import AppError from '@errors/AppError';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, sep } from 'path';
import { REPORT_FILES_PATH } from '@constants/filesPaths';

export default class DeleteOrdersWorkCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private ordersRepository: IOrdersRepository,
    private orderWorksRepository: IOrderWorksRepository
  ) {}

  async execute(data: IDeleteOrdersWorkDTO): Promise<boolean> {
    const { condominiumId, orderId, orderWorkId, userId } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);
    if (condominium.adminId !== userId) throw new AppError('Não tens permissão para atualizar os dados do pedido', 403);

    const order = await this.ordersRepository.findById(orderId);
    if (!order) throw new AppError('Pedido não encontrado', 404);
    if (order.condominiumId !== condominiumId) throw new AppError('Pedido não pertence ao condomínio', 403);

    const orderWorkDb = await this.orderWorksRepository.findById(orderWorkId);
    if (!orderWorkDb) throw new AppError('Atualização do pedido não encontrada', 404);
    if (orderWorkDb.orderId !== orderId) throw new AppError('Atualização do pedido não pertence ao pedido', 403);

    const isDeleted = await this.orderWorksRepository.delete(orderWorkId);

    if (isDeleted) {
      // Validar se pasta existe, se naõ existir criar
      if (!existsSync(REPORT_FILES_PATH)) {
        mkdirSync(REPORT_FILES_PATH, { recursive: true });
      }

      if (orderWorkDb.reportFile) {
        const imageName = orderWorkDb.reportFile.split(sep).pop();
        const imagePath = join(REPORT_FILES_PATH, imageName);
        if (existsSync(imagePath)) {
          unlinkSync(imagePath);
        }
      }
    }

    return isDeleted;
  }
}
