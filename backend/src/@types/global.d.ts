import AreaReservations from '@entities/AreaReservations';
import CommonAreas from '@entities/CommonAreas';
import Condominiums from '@entities/Condominiums';
import Users from '@entities/Users';
import { OrderWorks } from '@prismaClient/index';

export {};

declare global {
  var adminToken: string;
  var residentToken: string;
  var resident2Token: string;
  var nonResidentToken: string;
  var admin: Users;
  var adminId: string;
  var residentId: string;
  var resident2Id: string;
  var condominium: Condominiums;
  var condominiumId: string;
  var commonAreaId: string;
  var orderId: string;
  var pendingOrderId: string;
  var orderWorkId: string;
  var commonArea: CommonAreas;
  var reservation: AreaReservations;
  var service: Services;
  var orderWorks: OrderWorks;
  var serviceReqCompleted: Services;
  var serviceReqPending: Services;
  var serviceReqPending2: Services;
  var prisma: PrismaClient;
}
