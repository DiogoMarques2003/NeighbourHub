import IUsersRepository from '@repositories/IUsersRepository';
import IUserEditDTO from './IUserEditDTO';
import AppError from '@errors/AppError';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, sep } from 'path';
import { BASE_PROFILE_PICTURES_PATH, PROFILE_PICTURES_PATH } from '@constants/filesPaths';
import generatePathToFile from '@shared/generatePathToFile';

export default class UserEditCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUserEditDTO) {
    const { id, name, password, phoneNumber, iban, foto, deleteFoto } = data;

    const userDb = await this.userRepository.findById(id);
    if (!userDb) throw new AppError('Volte a fazer login', 401);

    if (name) userDb.name = name;
    if (phoneNumber) userDb.phoneNumber = phoneNumber;
    if (iban) userDb.iban = iban;

    if (password) {
      const passwordMatch = await bcrypt.compare(password, userDb.password);
      if (passwordMatch) throw new AppError('A nova password não pode ser igual a antiga', 400);
      userDb.password = await bcrypt.hash(password, 10);
    }

    if (foto || deleteFoto) {
      // Validar se pasta existe, se naõ existir criar
      if (!existsSync(PROFILE_PICTURES_PATH)) {
        mkdirSync(PROFILE_PICTURES_PATH, { recursive: true });
      }

      // Apagar a imagem caso o utilizador tenha uma
      if (userDb.foto) {
        const userPhotoName = userDb.foto.split(sep).pop();
        const userPhotoPath = join(PROFILE_PICTURES_PATH, userPhotoName);
        if (existsSync(userPhotoPath)) unlinkSync(userDb.foto);
      }

      userDb.foto = null;
    }

    if (foto) {
      const extension = foto.originalname.split('.').pop();
      const photoName = `${uuid()}.${extension}`;
      userDb.foto = join(BASE_PROFILE_PICTURES_PATH, photoName);
      // Copiar a imagem para o diretorio de arquivos
      copyFileSync(join(foto.destination, foto.filename), join(PROFILE_PICTURES_PATH, photoName));
      // Apagar imagem temporaria
      unlinkSync(join(foto.destination, foto.filename));
    }

    await this.userRepository.update(userDb);

    // Apagar password
    delete userDb.password;
    // Gerar o caminho para aceder a imagem
    if (userDb.foto) {
      userDb.foto = generatePathToFile(userDb.foto);
    }

    return userDb;
  }
}
