import IUsersRepository from '@repositories/IUsersRepository';
import IUserCreateAccountDTO from './IUserCreateAccountDTO';
import AppError from '@errors/AppError';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import {
  PROFILE_PICTURES_PATH,
  BASE_PROFILE_PICTURES_PATH,
} from '@constants/filesPaths';
import Users from '@entities/Users';
import generateToken from '@shared/generateToken';
import { copyFileSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';

export default class UserCreateAccountcase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUserCreateAccountDTO): Promise<string> {
    const { name, email, password, phoneNumber, iban, foto } = data;

    const userEmailDB = await this.usersRepository.findByEmail(email);
    if (userEmailDB) throw new AppError('O email já se encontra em uso', 400);

    const encryptedPassword = await bcrypt.hash(password, 10);

    let fotoUri: string;

    if (foto) {
      const extension = foto.originalname.split('.').pop();
      const photoName = `${uuid()}.${extension}`;
      fotoUri = join(BASE_PROFILE_PICTURES_PATH, photoName);
      // Copiar a imagem para o diretorio de arquivos
      copyFileSync(
        join(foto.destination, foto.filename),
        join(PROFILE_PICTURES_PATH, photoName)
      );
      // Apagar imagem temporaria
      unlinkSync(
        join(foto.destination, foto.filename)
      );
    }

    const userClass = new Users({
      name,
      email,
      password: encryptedPassword,
      phoneNumber,
      iban,
      foto: fotoUri,
    });

    await this.usersRepository.create(userClass);

    return generateToken({ id: userClass.id });
  }
}
