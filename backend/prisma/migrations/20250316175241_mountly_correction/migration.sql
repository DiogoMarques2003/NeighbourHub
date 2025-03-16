/*
  Warnings:

  - You are about to drop the column `mountlyQuota` on the `Condominiums` table. All the data in the column will be lost.
  - Added the required column `monthlyQuota` to the `Condominiums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Condominiums" DROP COLUMN "mountlyQuota",
ADD COLUMN     "monthlyQuota" DOUBLE PRECISION NOT NULL;
