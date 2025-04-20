import CommonAreas from '@entities/CommonAreas';
import { PrismaClient } from '@prismaClient/client';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';

export default class PrismaCommonAreasRepository implements ICommonAreasRepository {
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

  countByType(condId: string, type?: number): Promise<number> {
    return this.prisma.commonAreas.count({ where: { condominiumId: condId, ...(type && { type }) } });
  }

  getCommonAreasWithPagination(
    pageNumber: number,
    pageSize: number,
    condId: string,
    type?: number
  ): Promise<CommonAreas[]> {
    return this.prisma.commonAreas.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { condominiumId: condId, ...(type && { type }) },
      orderBy: { createdAT: 'desc' },
    });
  }

  update(commonArea: CommonAreas): Promise<CommonAreas> {
    return this.prisma.commonAreas.update({
      where: { id: commonArea.id },
      data: commonArea,
    });
  }

  async delete(id: string): Promise<Boolean> {
    return !!(await this.prisma.commonAreas.delete({ where: { id } }));
  }
}
