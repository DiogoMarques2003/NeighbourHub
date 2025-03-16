/*
  Warnings:

  - You are about to drop the column `poistedAt` on the `OrderWorks` table. All the data in the column will be lost.
  - Added the required column `postedAt` to the `OrderWorks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderWorks" DROP COLUMN "poistedAt",
ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL;
