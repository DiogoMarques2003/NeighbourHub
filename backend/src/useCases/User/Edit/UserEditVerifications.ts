import AppError from '@errors/AppError';
import IUserEditDTO from './IUserEditDTO';
import { PICTURES_EXTENSIONS } from '@constants/filesExtensions';

export default class UserEditVerifications {
  execute(data: IUserEditDTO) {
    const { name, password, phoneNumber, iban, foto, deleteFoto } = data;

    if (name && typeof name !== 'string') throw new AppError('Nome inválido', 400);
    if (password && (typeof password !== 'string' || password.length < 8)) throw new AppError('Senha inválida', 400);
    if (phoneNumber && typeof phoneNumber !== 'string') throw new AppError('Número de telefone inválido', 400);
    if (iban && typeof iban !== 'string') throw new AppError('IBAN inválido', 400);
    if (foto && (typeof foto !== 'object' || !PICTURES_EXTENSIONS.includes(foto.originalname.split('.').pop())))
      throw new AppError('Foto inválida', 400);
    if (typeof deleteFoto !== 'undefined' && typeof deleteFoto !== 'boolean')
      throw new AppError('Campo deleteFoto inválido', 400);
  }
}
