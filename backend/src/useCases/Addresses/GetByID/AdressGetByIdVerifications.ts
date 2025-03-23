import { isValidUUID } from '@shared/verifications';
import IAddressGetByIdDTO from './IAdressGetByIdDTO';
import AppError from '@errors/AppError';

export default class AddressGetByIdVerifications {
  execute(data: IAddressGetByIdDTO) {
    const { id, condId } = data;

    if (!id || typeof id !== 'string' || !isValidUUID(id))
      throw new AppError('Id Inválido', 400);

    if (!condId || typeof condId !== 'string' || !isValidUUID(condId))
      throw new AppError('Id de condomínio inválido', 400);
  }
}
