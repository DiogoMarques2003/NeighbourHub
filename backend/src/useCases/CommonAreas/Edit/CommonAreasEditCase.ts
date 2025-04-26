import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICommonAreasCreateDTO from './ICommonAreasEditDTO';
import AppError from '@errors/AppError';
import { v4 as uuid } from 'uuid';
import CommonAreas from '@entities/CommonAreas';
import { BASE_COMMON_AREAS_PICTURES_PATH, COMMON_AREAS_PATH } from '@constants/filesPaths';
import path, { join, sep } from 'path';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import generatePathToFile from '@shared/generatePathToFile';

export default class CommonAreasEditCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository
  ) {}

  async execute(data: ICommonAreasCreateDTO): Promise<CommonAreas> {
    const {
      id,
      status,
      userId,
      name,
      cost,
      rules,
      capacity,
      type,
      imagesAdd,
      imagesRemove,
      condominiumId,
      endSchedule,
      startSchedule,
    } = data;

    // Verifica se o espaço comum existe
    const commonAreaDb = await this.commonAreasRepository.findById(id);
    if (!commonAreaDb) throw new AppError('Espaço comum não encontrado', 404);

    // Valida o condomínio
    const condDb = await this.condominiumsRepository.findById(condominiumId);
    if (!condDb) throw new AppError('Condomínio inexistente', 404);

    if (userId != condDb.adminId) throw new AppError('Não pode atualizar este condominio', 403);

    // Atualiza as informações do espaço comum, se fornecido
    if (name) commonAreaDb.name = name;
    if (cost) commonAreaDb.cost = cost;
    if (rules) commonAreaDb.rules = rules;
    if (capacity) commonAreaDb.capacity = capacity;
    if (type) commonAreaDb.type = type;
    if (endSchedule) commonAreaDb.endSchedule = endSchedule;
    if (startSchedule) commonAreaDb.startSchedule = startSchedule;
    if (status) commonAreaDb.status = status;

    // Garantir que fica pelo menos uma imagem e no máximo 4
    let resultImagesNumber = commonAreaDb.images.length;
    if (imagesAdd) resultImagesNumber += imagesAdd.length;
    if (imagesRemove) resultImagesNumber -= imagesRemove.length;

    if (resultImagesNumber > 4) throw new AppError('Número máximo de imagens atingido. (max. 4)', 400);
    if (resultImagesNumber <= 0) throw new AppError('Número mínimo de imagens atingido. (min. 1)', 400);

    // Validar se pasta existe, se naõ existir criar
    if (!existsSync(COMMON_AREAS_PATH)) {
      mkdirSync(COMMON_AREAS_PATH, { recursive: true });
    }

    // Remover as imagens que o utilizador pedir
    if (imagesRemove) {
      for (const imageRemove of imagesRemove) {
        const imageName = imageRemove.split(sep).pop();
        const imagePath = path.resolve(COMMON_AREAS_PATH, imageName);
        if (existsSync(imagePath)) {
          unlinkSync(imagePath);
        }
        commonAreaDb.images = commonAreaDb.images.filter((image) => image.split(sep).pop() !== imageRemove.split(sep).pop());
      }
    }

    // Adicionar novas imagens
    if (imagesAdd) {
      for (const imageAdd of imagesAdd) {
        const extension = imageAdd.originalname.split('.').pop();
        const photoName = `${uuid()}.${extension}`;
        const photoUri = join(BASE_COMMON_AREAS_PICTURES_PATH, photoName);
        // Copiar a imagem para o diretorio de arquivos
        copyFileSync(join(imageAdd.destination, imageAdd.filename), join(COMMON_AREAS_PATH, photoName));
        // Apagar imagem temporaria
        unlinkSync(join(imageAdd.destination, imageAdd.filename));
        commonAreaDb.images.push(photoUri);
      }
    }

    // Salva a alteração no repositório
    await this.commonAreasRepository.update(commonAreaDb);

    commonAreaDb.images = commonAreaDb.images.map((image) => generatePathToFile(image));

    return commonAreaDb;
  }
}
