import CommonAreas from '@entities/CommonAreas';
import { PrismaClient } from '@prisma/client';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';

export default class PrismaCommonAreasRepository
  implements ICommonAreasRepository
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<CommonAreas | null> {
    return this.prisma.commonAreas.findUnique({ where: { id } });
  }

  create(commonArea: CommonAreas): Promise<CommonAreas> {
    return this.prisma.commonAreas.create({ data: commonArea });
  }

  countByType(type?: number): Promise<number> {
    return this.prisma.commonAreas.count({ where: { type } });
  }

  getCommonAreasWithPagination(
    pageNumber: number,
    pageSize: number,
    type?: number
  ): Promise<CommonAreas[]> {
    return this.prisma.commonAreas.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { type },
    });
  }
}
