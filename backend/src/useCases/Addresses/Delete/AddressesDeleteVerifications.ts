import IAddressesEditDTO from './IAddressesDeleteDTO';
import AppError from '@errors/AppError';
import { isValidUUID } from '@shared/verifications';

export default class AddressesDeleteVerifications {
  execute(data: IAddressesEditDTO) {
    const { id, condominiumId } = data;

    if (!id || typeof id !== 'string' || !isValidUUID(id)) throw new AppError('ID do endereço inválido', 400);

    if (!condominiumId || typeof condominiumId !== 'string' || !isValidUUID(condominiumId))
      throw new AppError('Id do condomínio inválido', 400);
  }
}
