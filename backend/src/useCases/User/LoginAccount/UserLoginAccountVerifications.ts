import AppError from '@errors/AppError';
import IUserLoginAccountDTO from './IUserLoginAccountDTO';
import { EMAIL_REGEX } from '@constants/regexs';

export default class UserLoginAccountVerifications {
  execute(data: IUserLoginAccountDTO) {
    const { email, password } = data;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email))
      throw new AppError('Email inválido', 400);

    if (!password || typeof password !== 'string' || password.length < 8)
      throw new AppError('Password inválida.', 400);
  }
}
