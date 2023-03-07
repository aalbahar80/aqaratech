/*
  Warnings:

  - You are about to drop the column `dueAt` on the `LeaseInvoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LeaseInvoice" DROP COLUMN "dueAt";

-- AlterTable
ALTER TABLE "OrganizationSettings" ADD COLUMN     "dueDuration" interval DEFAULT '1 month';

CREATE OR REPLACE VIEW "LeaseInvoiceV" AS
SELECT
    i.id,
    i."createdAt",
    i."updatedAt",
    i."postAt",
    i."paidAt",
    i."isPaid",
    i."amount",
    i."memo",
    i."mfPaymentId",
    i."mfData",
    i."leaseId",
    i."organizationId",
    i."portfolioId",
    i."postAt" + (s."dueDuration") AS "dueAt"
FROM
    "LeaseInvoice" i
    INNER JOIN "OrganizationSettings" s ON i."organizationId" = s."organizationId";
