import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IFineRepository from '@repositories/IFineRepository';
import IFineGetDTO from './IFineGetDTO';
import AppError from '@errors/AppError';
import { Prisma } from '@prismaClient/index';
import Fine from '@entities/Fine';

export default class FineGetCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private fineRepository: IFineRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IFineGetDTO): Promise<DataPagination<Fine[]>> {
    const { condominiumId, userId, fromUserId, maxValue, minValue, pageNumber, pageSize, sortBy, sortOrder } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new Error('Condomínio não encontrado');

    const hasAddress = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!hasAddress && condominium.adminId !== userId)
      throw new AppError('Não podes consultar as multas deste condominio', 403);

    if (hasAddress && fromUserId) throw new AppError('Não podes filtrar multas por morador', 403);

    const andCondition: Prisma.FineWhereInput[] = [];

    if (maxValue) andCondition.push({ amount: { lte: maxValue } });
    if (minValue) andCondition.push({ amount: { gte: minValue } });

    const filters: Prisma.FineWhereInput = {
      areaReservation: {
        area: {
          condominiumId,
        },
      },
      AND: andCondition,
    };

    if (hasAddress) filters.areaReservation.userId = userId;
    else if (fromUserId && condominium.adminId === userId) {
      const existeAddress = await this.addressRepository.getByUserAndCond(fromUserId, condominiumId);
      if (!existeAddress) throw new AppError('Utilizador não faz parte do condominio', 404);
      filters.areaReservation.userId = fromUserId;
    }

    const orderBy: Prisma.FineOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const count = await this.fineRepository.countWithFilter(filters);
    if (!count) throw new AppError('Nenhum registo encontrado', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const fines = await this.fineRepository.getWithPagination(pageSize, pageNumber, filters, orderBy);

    return { data: fines, pages, actualPage: pageNumber, nRecords: count };
  }
}
