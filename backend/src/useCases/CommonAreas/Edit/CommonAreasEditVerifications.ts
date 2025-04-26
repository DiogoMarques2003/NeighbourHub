import AppError from '@errors/AppError';
import ICommonAreasCreateDTO from './ICommonAreasEditDTO';
import { isHoursIntervalValid, isValidUUID } from '@shared/verifications';
import stringToHours from '@shared/convertStringToHours';
import { PICTURES_EXTENSIONS } from '@constants/filesExtensions';
import { STATUS } from '@constants/status';

export default class CommonAreasEditVerifications {
  execute(data: ICommonAreasCreateDTO) {
    const {
      id,
      status,
      name,
      rules,
      capacity,
      type,
      imagesAdd,
      imagesRemove,
      condominiumId,
      endSchedule,
      startSchedule,
    } = data;

    if (!id || typeof id !== 'string' || !isValidUUID(id)) throw new AppError('ID inválido', 400);

    if (status && (typeof name !== 'string' || !STATUS.includes(status))) throw new AppError('Status Inválido', 400);

    if (name && typeof name !== 'string') throw new AppError('Nome inválido', 400);

    if (data.cost) {
      data.cost = Number(data.cost);
      if (isNaN(data.cost) || data.cost < 0) throw new AppError('Preço inválido', 400);
    }

    if (capacity) {
      data.capacity = Number(data.capacity);
      if (isNaN(data.capacity) || data.capacity <= 0) throw new AppError('Capacidade inválida', 400);
    }

    if (type !== undefined) {
      data.type = Number(data.type);
      if (isNaN(data.type)) throw new AppError('Tipo inválido', 400);
    }

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(id))
      throw new AppError('Condomínio inválido', 400);

    if (startSchedule && typeof startSchedule !== 'string') throw new AppError('Horário inválido', 400);

    if (endSchedule && typeof endSchedule !== 'string') throw new AppError('Horário inválido', 400);

    if (startSchedule && endSchedule) {
      if (isHoursIntervalValid(stringToHours(startSchedule), stringToHours(endSchedule))) {
        throw new AppError('Horário inválido', 400);
      }
    }

    if (imagesAdd && imagesAdd.length > 4) throw new AppError('Número máximo de imagens atingido. (max. 4)', 400);

    if (imagesAdd.length) {
      for (const image of imagesAdd) {
        if (typeof image !== 'object' || !PICTURES_EXTENSIONS.includes(image.originalname.split('.').pop())) {
          throw new AppError('Foto inválida', 400);
        }
      }
    }
    if (imagesRemove && typeof imagesRemove !== 'object') data.imagesRemove = [imagesRemove];
    if (data.imagesRemove && data.imagesRemove.length > 4) throw new AppError('Número máximo de imagens atingido. (max. 4)', 400);
  }
}
