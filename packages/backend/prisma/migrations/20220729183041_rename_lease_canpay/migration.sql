/*
  Warnings:

  - You are about to drop the column `deactivated` on the `Lease` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "deactivated",
ADD COLUMN     "canPay" BOOLEAN NOT NULL DEFAULT true;
