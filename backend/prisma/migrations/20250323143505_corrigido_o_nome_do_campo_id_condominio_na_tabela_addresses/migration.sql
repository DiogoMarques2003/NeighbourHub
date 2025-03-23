/*
  Warnings:

  - You are about to drop the column `coundominiumId` on the `Addresses` table. All the data in the column will be lost.
  - Added the required column `condominiumId` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_coundominiumId_fkey";

-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "coundominiumId",
ADD COLUMN     "condominiumId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
