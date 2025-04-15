/*
  Warnings:

  - A unique constraint covering the columns `[areaReservationId]` on the table `Fine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fine_areaReservationId_key" ON "Fine"("areaReservationId");
