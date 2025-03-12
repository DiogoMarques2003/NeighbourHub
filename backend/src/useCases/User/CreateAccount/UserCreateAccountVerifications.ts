import { EMAIL_REGEX } from '@constants/regexs';
import { PICTURES_EXTENSIONS } from '@constants/filesExtensions';
import IUserCreateAccountDTO from './IUserCreateAccountDTO';
import AppError from '@errors/AppError';

export default class UserCreateAccountVerifications {
  execute(data: IUserCreateAccountDTO) {
    const { name, email, password, phoneNumber, iban, foto } = data;

    if (!name || typeof name !== 'string')
      throw new AppError('Nome inválido', 400);

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email))
      throw new AppError('Email inválido', 400);

    if (!password || typeof password !== 'string' || password.length < 8)
      throw new AppError(
        'Password inválida. Tem que ter no mínimo 8 caracteres.',
        400
      );

    if (!phoneNumber || typeof phoneNumber !== 'string')
      throw new AppError('Número de telefone inválido', 400);

    if (!iban || typeof iban !== 'string')
      throw new AppError('IBAN inválido', 400);

    if (
      foto &&
      (typeof foto !== 'object' ||
        !PICTURES_EXTENSIONS.includes(foto.originalname.split('.').pop()))
    )
      throw new AppError('Foto inválida', 400);
  }
}
