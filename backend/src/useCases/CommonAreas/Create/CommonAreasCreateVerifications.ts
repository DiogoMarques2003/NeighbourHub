import AppError from '@errors/AppError';
import ICommonAreasCreateDTO from './ICommonAreasCreateDTO';
import { isHoursIntervalValid } from '@shared/verifications';
import stringToHours from '@shared/convertStringToHours';
import { PICTURES_EXTENSIONS } from '@constants/filesExtensions';

export default class CommonAreasCreateVerifications {
  execute(data: ICommonAreasCreateDTO) {
    const {
      name,
      rules,
      capacity,
      type,
      images,
      condominiumId,
      endSchedule,
      startSchedule,
    } = data;

    if (!name || typeof name !== 'string')
      throw new AppError('Nome inválido', 400);

    data.cost = Number(data.cost);

    if (data.cost && typeof data.cost !== 'number')
      throw new AppError('Preço inválido', 400);

    data.capacity = Number(data.capacity);

    if (
      !data.capacity ||
      typeof data.capacity !== 'number' ||
      data.capacity <= 0
    )
      throw new AppError('Capacidade inválida', 400);

    data.type = Number(data.type) 
      
    if (!data.type || typeof data.type !== 'number')
      throw new AppError('Tipo inválida', 400);

    if (!condominiumId || typeof condominiumId !== 'string')
      throw new AppError('Condominio inválida', 400);

    if (!startSchedule || typeof startSchedule !== 'string')
      throw new AppError('Horaio inválido', 400);

    if (!endSchedule || typeof endSchedule !== 'string')
      throw new AppError('Horario inválido', 400);

    if (
      isHoursIntervalValid(
        stringToHours(startSchedule),
        stringToHours(endSchedule)
      )
    )
      throw new AppError('Horaio inválido', 400);

    if (images && images.length > 4)
      throw new AppError('Numero de imagens maximo atingido. (max. 4)', 400);

    for (const image of images) {
      if (
        typeof image !== 'object' ||
        !PICTURES_EXTENSIONS.includes(image.originalname.split('.').pop())
      )
        throw new AppError('Foto inválida', 400);
    }
  }
}
