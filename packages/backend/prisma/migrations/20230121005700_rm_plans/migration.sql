/*
  Warnings:

  - You are about to drop the column `planId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_planId_fkey";

-- DropForeignKey
ALTER TABLE "PlanInvoice" DROP CONSTRAINT "PlanInvoice_organizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "planId";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "lat",
DROP COLUMN "long";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "PlanInvoice";
