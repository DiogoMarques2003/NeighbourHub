import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrderWorksRepository from '@repositories/IOrderWorksRepository';
import ICreateOrdersWorkDTO from './ICreateOrdersWorkDTO';
import OrderWorks from '@entities/OrderWorks';
import AppError from '@errors/AppError';
import { v4 as uuid } from 'uuid';
import { join } from 'path';
import { BASE_REPORT_FILES_PATH, REPORT_FILES_PATH } from '@constants/filesPaths';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import generatePathToFile from '@shared/generatePathToFile';
import { STATUS_ORDER_IN_PROGRESS } from '@constants/status';

export default class CreateOrdersWorkCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private ordersRepository: IOrdersRepository,
    private orderWorksRepository: IOrderWorksRepository
  ) {}

  async execute(data: ICreateOrdersWorkDTO): Promise<OrderWorks> {
    const { condominiumId, description, orderId, status, userId, reportFile } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);
    if (condominium.adminId !== userId) throw new AppError('Não tens permissão para atualizar os dados do pedido', 403);

    const order = await this.ordersRepository.findById(orderId);
    if (!order) throw new AppError('Pedido não encontrado', 404);
    if (order.condominiumId !== condominiumId) throw new AppError('Pedido não pertence ao condomínio', 403);
    if (order.status !== STATUS_ORDER_IN_PROGRESS) throw new AppError('Pedido não está em andamento', 400);

    const orderWorkClass = new OrderWorks({
      status,
      description,
      orderId,
    });

    if (reportFile) {
      // Validar se pasta existe, se naõ existir criar
      if (!existsSync(REPORT_FILES_PATH)) {
        mkdirSync(REPORT_FILES_PATH, { recursive: true });
      }

      const extension = reportFile.originalname.split('.').pop();
      const reportName = `${uuid()}.${extension}`;
      orderWorkClass.reportFile = join(BASE_REPORT_FILES_PATH, reportName);
      // Copiar a imagem para o diretorio de arquivos
      copyFileSync(join(reportFile.destination, reportFile.filename), join(REPORT_FILES_PATH, reportName));
      // Apagar imagem temporaria
      unlinkSync(join(reportFile.destination, reportFile.filename));
    }

    await this.orderWorksRepository.create(orderWorkClass);

    if (orderWorkClass.reportFile) orderWorkClass.reportFile = generatePathToFile(orderWorkClass.reportFile);

    return orderWorkClass;
  }
}
