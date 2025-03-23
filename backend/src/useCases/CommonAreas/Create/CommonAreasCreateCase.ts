import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICommonAreasCreateDTO from './ICommonAreasCreateDTO';
import AppError from '@errors/AppError';
import { v4 as uuid } from 'uuid';
import CommonAreas from '@entities/CommonAreas';
import {
  BASE_COMMON_AREAS_PICTURES_PATH,
  COMMON_AREAS_PATH,
} from '@constants/filesPaths';
import { join } from 'path';
import { copyFileSync, unlinkSync } from 'fs';
import { STATUS_READY } from '@constants/status';

export default class CommonAreasCreateCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository
  ) {}

  async execute(data: ICommonAreasCreateDTO) {
    const {
      name,
      cost,
      rules,
      capacity,
      type,
      images,
      condominiumId,
      endSchedule,
      startSchedule,
    } = data;

    //Valida condominio
    const condDb = await this.condominiumsRepository.findById(condominiumId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    const imagesConv: string[] = [];

    for (const image of images) {
      const extension = image.originalname.split('.').pop();
      const photoName = `${uuid()}.${extension}`;
      const photoUri = join(BASE_COMMON_AREAS_PICTURES_PATH, photoName);
      // Copiar a imagem para o diretorio de arquivos
      copyFileSync(
        join(image.destination, image.filename),
        join(COMMON_AREAS_PATH, photoName)
      );
      // Apagar imagem temporaria
      unlinkSync(join(image.destination, image.filename));

      imagesConv.push(photoUri);
    }

    const commonAreaClass = new CommonAreas({
      name,
      cost,
      rules,
      capacity,
      type,
      status: STATUS_READY,
      images: imagesConv,
      condominiumId,
      endSchedule,
      startSchedule,
    });

    await this.commonAreasRepository.create(commonAreaClass)
    return commonAreaClass
  }
}
