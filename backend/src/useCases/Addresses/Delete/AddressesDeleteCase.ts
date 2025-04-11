import IAddressesRepository from '@repositories/IAddressesRepository';
import IAddressesDeleteDTO from './IAddressesDeleteDTO';
import AppError from '@errors/AppError';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';

export default class AddressesDeleteCase {
  constructor(
    private addressesRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository
  ) {}

  async execute(data: IAddressesDeleteDTO): Promise<void> {
    const { id, adminId, condominiumId } = data;

    // Verificar se o condomínio existe
    const cond = await this.condominiumRepository.findById(condominiumId);
    if (!cond) throw new AppError('Condomínio não existe', 404);

    // Validar se o admin tem permissão para deletar
    if (adminId !== cond.adminId) throw new AppError('Não tem permissão para eliminar este endereço', 403);

    // Verificar se o id do endereço é válido
    const address = await this.addressesRepository.findById(id);
    if (!address) throw new AppError('Endereço não encontrado', 404);

    // Verificar se pertence ao condomínio informado
    if (address.condominiumId !== condominiumId) {
      throw new AppError('Não pode eliminar este endereço', 403);
    }

    // Deletar o endereço
    await this.addressesRepository.delete(id);
  }
}
