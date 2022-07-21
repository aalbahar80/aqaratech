/*
  Warnings:

  - You are about to drop the column `shortName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `Tenant` table. All the data in the column will be lost.
  - Made the column `organizationId` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "shortName",
ADD COLUMN     "label" TEXT;

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "shortName",
ADD COLUMN     "label" TEXT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "label" TEXT;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "organizationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "shortName",
ADD COLUMN     "label" TEXT;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "label" TEXT;
