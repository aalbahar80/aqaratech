-- CreateEnum
CREATE TYPE "PaymentTime" AS ENUM ('ADVANCED', 'ON_TIME', 'LATE');

-- CreateEnum
CREATE TYPE "DueStatus" AS ENUM ('NOT_DUE', 'DUE', 'PAST_DUE');

CREATE OR REPLACE VIEW "LeaseInvoiceV" AS
WITH invoice_with_due_at AS (
    SELECT
        i.*,
        i."postAt" + (s."dueDuration") AS "dueAt"
    FROM
        "LeaseInvoice" i
        INNER JOIN "OrganizationSettings" s ON i."organizationId" = s."organizationId"
)
SELECT
    iwa.id,
    iwa."createdAt",
    iwa."updatedAt",
    iwa."postAt",
    iwa."paidAt",
    iwa."isPaid",
    iwa."amount",
    iwa."memo",
    iwa."mfPaymentId",
    iwa."mfData",
    iwa."leaseId",
    iwa."organizationId",
    iwa."portfolioId",
    iwa."dueAt",
    CASE
        WHEN iwa."paidAt" IS NULL THEN NULL
        WHEN iwa."paidAt" < iwa."postAt" THEN 'ADVANCED'
        WHEN iwa."postAt" <= iwa."paidAt" AND iwa."paidAt" <= iwa."dueAt" THEN 'ON_TIME'
        WHEN iwa."dueAt" < iwa."paidAt" THEN 'LATE'
    END::"PaymentTime" AS "paymentTime",
    CASE
        WHEN iwa."paidAt" IS NOT NULL THEN NULL
        WHEN iwa."postAt" > NOW() THEN 'NOT_DUE'
        WHEN iwa."postAt" <= NOW() AND NOW() <= iwa."dueAt" THEN 'DUE'
        WHEN iwa."dueAt" < NOW() THEN 'PAST_DUE'
    END::"DueStatus" AS "dueStatus"
FROM
    invoice_with_due_at iwa;
