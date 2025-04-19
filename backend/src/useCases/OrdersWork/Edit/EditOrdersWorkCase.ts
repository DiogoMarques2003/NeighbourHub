import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IOrdersRepository from '@repositories/IOrdersRepository';
import IOrderWorksRepository from '@repositories/IOrderWorksRepository';
import { v4 as uuid } from 'uuid';
import { join, sep } from 'path';
import { BASE_REPORT_FILES_PATH, REPORT_FILES_PATH } from '@constants/filesPaths';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import generatePathToFile from '@shared/generatePathToFile';
import OrderWorks from '@entities/OrderWorks';
import AppError from '@errors/AppError';
import IEditOrdersWorkDTO from './IEditOrdersWorkDTO';

export default class EditOrdersWorkCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private ordersRepository: IOrdersRepository,
    private orderWorksRepository: IOrderWorksRepository
  ) {}

  async execute(data: IEditOrdersWorkDTO): Promise<OrderWorks> {
    const { condominiumId, description, orderId, status, userId, reportFile, orderWorkId, deleteReportFile } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);
    if (condominium.adminId !== userId) throw new AppError('Não tens permissão para atualizar os dados do pedido', 403);

    const order = await this.ordersRepository.findById(orderId);
    if (!order) throw new AppError('Pedido não encontrado', 404);
    if (order.condominiumId !== condominiumId) throw new AppError('Pedido não pertence ao condomínio', 403);

    const orderWorkDb = await this.orderWorksRepository.findById(orderWorkId);
    if (!orderWorkDb) throw new AppError('Atualização do pedido não encontrada', 404);
    if (orderWorkDb.orderId !== orderId) throw new AppError('Atualização do pedido não pertence ao pedido', 403);

    if (description) orderWorkDb.description = description;
    if (status) orderWorkDb.status = status;

    // Apagar a imagem existente caso necessario
    if ((reportFile || deleteReportFile) && orderWorkDb.reportFile) {
      // Validar se pasta existe, se naõ existir criar
      if (!existsSync(REPORT_FILES_PATH)) {
        mkdirSync(REPORT_FILES_PATH, { recursive: true });
      }

      const imageName = orderWorkDb.reportFile.split(sep).pop();
      const imagePath = join(REPORT_FILES_PATH, imageName);
      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }

      orderWorkDb.reportFile = null;
    }

    // Adicionar a nova imagem caso exista
    if (reportFile) {
      const extension = reportFile.originalname.split('.').pop();
      const reportName = `${uuid()}.${extension}`;
      orderWorkDb.reportFile = join(BASE_REPORT_FILES_PATH, reportName);
      // Copiar a imagem para o diretorio de arquivos
      copyFileSync(join(reportFile.destination, reportFile.filename), join(BASE_REPORT_FILES_PATH, reportName));
      // Apagar imagem temporaria
      unlinkSync(join(reportFile.destination, reportFile.filename));
    }

    await this.orderWorksRepository.update(orderWorkDb);

    if (orderWorkDb.reportFile) orderWorkDb.reportFile = generatePathToFile(orderWorkDb.reportFile);

    return orderWorkDb;
  }
}
