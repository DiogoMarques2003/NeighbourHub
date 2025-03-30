import IUsersRepository from '@repositories/IUsersRepository';
import IUserLoginAccountDTO from './IUserLoginAccountDTO';
import AppError from '@errors/AppError';
import bcrypt from 'bcryptjs';
import generateToken from '@shared/generateToken';

export default class UserLoginAccountCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUserLoginAccountDTO): Promise<string> {
    const { email, password } = data;

    const userDb = await this.usersRepository.findByEmail(email);
    if (!userDb) throw new AppError('Email ou password incorretos.', 401);

    const passwordMatch = await bcrypt.compare(password, userDb.password);
    if (!passwordMatch)
      throw new AppError('Email ou password incorretos.', 401);

    return generateToken({ id: userDb.id });
  }
}
