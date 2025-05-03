import CommonAreas from '@entities/CommonAreas';

export {};

declare global {
  var adminToken: string;
  var residentToken: string;
  var condominiumId: string;
  var commonAreaId: string;
  var commonArea: CommonAreas;
  var prisma: PrismaClient;
}
