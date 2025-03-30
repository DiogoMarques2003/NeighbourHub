import IAddressesRepository from '@repositories/IAddressesRepository';
import IAddressesEditDTO from './IAddressesEditDTO';
import Addresses from '@entities/Addresses';
import AppError from '@errors/AppError';
import IUsersRepository from '@repositories/IUsersRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IMailProvider from '@providers/IMailProvider';

export default class AddressesEditCase {
  constructor(
    private addressesRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository,
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IAddressesEditDTO): Promise<Addresses> {
    const { id, adminId, country, city, street, houseNumber, postalCode, houseType, condominiumId } = data;

    // Buscar o endereço existente
    const address = await this.addressesRepository.findById(id);
    if (!address) throw new AppError('Endereço não encontrado', 404);

    if (address.condominiumId !== condominiumId) throw new AppError('Não pode editar este address', 400);
    // Verificar se o condomínio existe
    const cond = await this.condominiumRepository.findById(condominiumId);

    if (!cond) throw new AppError('Condomínio não existe', 404);

    // Validar se o admin tem permissão para editar
    if (adminId !== cond.adminId) throw new AppError('Sem permissão', 401);

    // Atualizar apenas os campos que foram passados
    if (country !== undefined) address.country = country;
    if (city !== undefined) address.city = city;
    if (street !== undefined) address.street = street;
    if (houseNumber !== undefined) address.houseNumber = houseNumber;
    if (postalCode !== undefined) address.postalCode = postalCode;
    if (houseType !== undefined) address.houseType = houseType;

    // Atualizar o endereço no banco de dados
    await this.addressesRepository.update(address);

    return address;
  }
}
