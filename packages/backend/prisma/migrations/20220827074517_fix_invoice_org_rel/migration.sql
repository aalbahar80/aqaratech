/*
  Warnings:

  - You are about to drop the `_OrganizationToPlanInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToPlanInvoice" DROP CONSTRAINT "_OrganizationToPlanInvoice_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToPlanInvoice" DROP CONSTRAINT "_OrganizationToPlanInvoice_B_fkey";

-- AlterTable
ALTER TABLE "PlanInvoice" ADD COLUMN     "organizationId" TEXT;

-- DropTable
DROP TABLE "_OrganizationToPlanInvoice";

-- AddForeignKey
ALTER TABLE "PlanInvoice" ADD CONSTRAINT "PlanInvoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
