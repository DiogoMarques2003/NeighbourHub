/*
  Warnings:

  - You are about to drop the column `schedule` on the `CommonAreas` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `OrderWorks` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `OrderWorks` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Orders` table. All the data in the column will be lost.
  - The primary key for the `Votings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Votings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `Votings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderID]` on the table `Votings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endSchedule` to the `CommonAreas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startSchedule` to the `CommonAreas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poistedAt` to the `OrderWorks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Votings_id_key";

-- AlterTable
ALTER TABLE "CommonAreas" DROP COLUMN "schedule",
ADD COLUMN     "endSchedule" TEXT NOT NULL,
ADD COLUMN     "startSchedule" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderWorks" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "poistedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "deadline",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Votings" DROP CONSTRAINT "Votings_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Votings_pkey" PRIMARY KEY ("userID", "orderID");

-- CreateIndex
CREATE UNIQUE INDEX "Votings_userID_key" ON "Votings"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Votings_orderID_key" ON "Votings"("orderID");
