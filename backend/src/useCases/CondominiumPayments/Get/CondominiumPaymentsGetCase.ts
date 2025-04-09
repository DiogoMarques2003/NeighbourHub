import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumPaymentsRepository from '@repositories/ICondominiumPaymentsRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumPaymentsGetDTO from './ICondominiumPaymentsGetDTO';
import CondominiumPayments from '@entities/CondominiumPayments';
import AppError from '@errors/AppError';
import { Prisma } from '@prismaClient/index';

export default class CondominiumPaymentsGetCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private condominiumPaymentsRepository: ICondominiumPaymentsRepository
  ) {}

  async execute(data: ICondominiumPaymentsGetDTO): Promise<DataPagination<CondominiumPayments[]>> {
    const {
      condominiumId,
      addressId,
      endDate,
      maxValue,
      minValue,
      pageNumber,
      pageSize,
      paymentType,
      sortBy,
      sortOrder,
      startDate,
      userId,
    } = data;

    //Validar Condominio
    const condominiumDb = await this.condominiumRepository.findById(condominiumId);
    if (!condominiumDb) throw new AppError('Condominio inexistente', 404);

    const hasAddress = await this.addressesRepository.getByUserAndCond(userId, condominiumId);

    if (condominiumDb.adminId !== userId && !hasAddress)
      throw new AppError('Não podes consultar os pagamentos deste condominio', 401);

    const andCondition: Prisma.CondominiumPaymentsWhereInput[] = [];

    if (endDate) andCondition.push({ date: { lte: endDate } });
    if (startDate) andCondition.push({ date: { gte: startDate } });
    if (maxValue) andCondition.push({ value: { lte: maxValue } });
    if (minValue) andCondition.push({ value: { gte: minValue } });

    const filters: Prisma.CondominiumPaymentsWhereInput = {
      address: {
        condominiumId: condominiumId,
      },
      AND: andCondition,
    };

    if (hasAddress) filters.address.userId = userId;
    else if (addressId && condominiumDb.adminId === userId) {
      const address = await this.addressesRepository.findById(addressId);
      if (!address) throw new AppError('Endereço inexistente', 404);
      if (address.condominiumId !== condominiumId) throw new AppError('Endereço não pertence ao condominio', 401);
      filters.addressId = addressId;
    }
    if (paymentType) filters.paymentType = paymentType;

    const orderBy: Prisma.CondominiumPaymentsOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const count = await this.condominiumPaymentsRepository.countWithFilters(filters);
    if (!count) throw new AppError('Não existem registos', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const condominiumPayments = await this.condominiumPaymentsRepository.getWithPagination(
      pageSize,
      pageNumber,
      filters,
      orderBy
    );

    for (const condominiumPayment of condominiumPayments) {
      if (!condominiumPayment.areaReservationId) delete condominiumPayment.areaReservationId;
    }

    return { data: condominiumPayments, pages, actualPage: pageNumber, nRecords: count };
  }
}
