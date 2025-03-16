/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Condominiums` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Condominiums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Condominiums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Condominiums" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Condominiums_email_key" ON "Condominiums"("email");
