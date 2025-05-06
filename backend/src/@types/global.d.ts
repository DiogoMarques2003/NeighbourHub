import CommonAreas from '@entities/CommonAreas';

export {};

declare global {
  var adminToken: string;
  var residentToken: string;
  var resident2Token: string;
  var nonResidentToken: string;
  var adminId: string;
  var residentId: string;
  var resident2Id: string;
  var condominiumId: string;
  var commonAreaId: string;
  var commonArea: CommonAreas;
  var service: Services;
  var serviceReqCompleted: Services;
  var serviceReqPending: Services;
  var serviceReqPending2: Services;
  var prisma: PrismaClient;
}
