import CommonAreas from '@entities/CommonAreas';
import { PrismaClient } from '@prisma/client';
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

  update(commonArea: CommonAreas): Promise<CommonAreas> {
    return this.prisma.commonAreas.update({ where: { id: commonArea.id }, data: commonArea });
  }
}
