import { isValidUUID } from '@shared/verifications';
import IEditOrdersWorkDTO from './IEditOrdersWorkDTO';
import AppError from '@errors/AppError';
import { STATUS_ORDERWORK } from '@constants/status';
import { PDF_EXTENSIONS } from '@constants/filesExtensions';

export default class EditOrdersWorkVerifications {
  execute(data: IEditOrdersWorkDTO) {
    const { condominiumId, deleteReportFile, description, orderId, orderWorkId, reportFile, status } = data;

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
        throw new AppError('Id do condomínio inválido', 400);

    if (!orderId || typeof orderId !== 'string' || !isValidUUID(orderId))
        throw new AppError('Id do pedido inválido', 400);

    if (!orderWorkId || typeof orderWorkId !== 'string' || !isValidUUID(orderWorkId))
        throw new AppError('Id da atualização do pedido inválido', 400);

    if (typeof deleteReportFile !== 'string') data.deleteReportFile = false;
    else if (deleteReportFile !== 'true') data.deleteReportFile = false;
    else data.deleteReportFile = true;

    if (description && typeof description !== 'string')
      throw new AppError('Descrição inválida', 400);

    if (status && (typeof status !== 'string' || !STATUS_ORDERWORK.includes(status)))
      throw new AppError('Status inválido', 400);

    if (reportFile && (typeof reportFile !== 'object' || reportFile.originalname.split('.').pop() !== PDF_EXTENSIONS))
        throw new AppError('Arquivo inválido. Tem que ser um PDF.', 400);
  }
}
