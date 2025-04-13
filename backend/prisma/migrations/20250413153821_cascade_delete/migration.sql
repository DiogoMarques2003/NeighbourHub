-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "AreaReservations" DROP CONSTRAINT "AreaReservations_areaId_fkey";

-- DropForeignKey
ALTER TABLE "AreaReservations" DROP CONSTRAINT "AreaReservations_userId_fkey";

-- DropForeignKey
ALTER TABLE "Budgets" DROP CONSTRAINT "Budgets_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CommonAreas" DROP CONSTRAINT "CommonAreas_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "CondominiumPayments" DROP CONSTRAINT "CondominiumPayments_addressId_fkey";

-- DropForeignKey
ALTER TABLE "CondominiumPayments" DROP CONSTRAINT "CondominiumPayments_areaReservationId_fkey";

-- DropForeignKey
ALTER TABLE "Condominiums" DROP CONSTRAINT "Condominiums_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Fine" DROP CONSTRAINT "Fine_areaReservationId_fkey";

-- DropForeignKey
ALTER TABLE "OrderWorks" DROP CONSTRAINT "OrderWorks_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequests" DROP CONSTRAINT "ServiceRequests_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequests" DROP CONSTRAINT "ServiceRequests_userId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceReviews" DROP CONSTRAINT "ServiceReviews_serviceRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Votings" DROP CONSTRAINT "Votings_budgetID_fkey";

-- DropForeignKey
ALTER TABLE "Votings" DROP CONSTRAINT "Votings_orderID_fkey";

-- DropForeignKey
ALTER TABLE "Votings" DROP CONSTRAINT "Votings_userID_fkey";

-- AddForeignKey
ALTER TABLE "Condominiums" ADD CONSTRAINT "Condominiums_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonAreas" ADD CONSTRAINT "CommonAreas_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaReservations" ADD CONSTRAINT "AreaReservations_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "CommonAreas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaReservations" ADD CONSTRAINT "AreaReservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondominiumPayments" ADD CONSTRAINT "CondominiumPayments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondominiumPayments" ADD CONSTRAINT "CondominiumPayments_areaReservationId_fkey" FOREIGN KEY ("areaReservationId") REFERENCES "AreaReservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_areaReservationId_fkey" FOREIGN KEY ("areaReservationId") REFERENCES "AreaReservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceReviews" ADD CONSTRAINT "ServiceReviews_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votings" ADD CONSTRAINT "Votings_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votings" ADD CONSTRAINT "Votings_budgetID_fkey" FOREIGN KEY ("budgetID") REFERENCES "Budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votings" ADD CONSTRAINT "Votings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderWorks" ADD CONSTRAINT "OrderWorks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
