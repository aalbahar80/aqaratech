/*
  Warnings:

  - Made the column `portfolioId` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "portfolioId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;
