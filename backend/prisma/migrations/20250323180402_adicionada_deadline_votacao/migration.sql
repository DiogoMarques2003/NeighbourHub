-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "votingDeadline" TIMESTAMP(3),
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL;
