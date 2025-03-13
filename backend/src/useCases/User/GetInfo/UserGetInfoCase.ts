import IUsersRepository from '@repositories/IUsersRepository';
import IUserGetInfoDTO from './IUserGetInfoDTO';
import Users from '@entities/Users';
import AppError from '@errors/AppError';
import generatePathToFile from '@shared/generatePathToFile';

export default class UserGetInfoCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUserGetInfoDTO): Promise<Users> {
    const { userId } = data;

    const userDb = await this.usersRepository.findById(userId);
    if (!userDb) throw new AppError('Sessão inválida', 401);

    delete userDb.password;

    if (userDb.foto) userDb.foto = generatePathToFile(userDb.foto);

    return userDb;
  }
}
