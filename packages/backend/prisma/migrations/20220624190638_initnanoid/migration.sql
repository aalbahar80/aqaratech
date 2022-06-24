-- Define nanoid generator
-- https://github.com/prisma/prisma/issues/2117#issuecomment-868728650
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION nanoid(size int DEFAULT 12)
RETURNS text AS $$
DECLARE
  id text := '';
  i int := 0;
  urlAlphabet char(64) := 'ModuleSymbhasOwnPr-0123456789abcdefghijklmnopqrstuvwxyz';
  bytes bytea := gen_random_bytes(size);
  byte int;
  pos int;
BEGIN
  WHILE i < size LOOP
    byte := get_byte(bytes, i);
    pos := (byte & 63) + 1; -- + 1 because substr starts at 1 for some reason
    id := id || substr(urlAlphabet, pos, 1);
    i = i + 1;
  END LOOP;
  RETURN id;
END
$$ LANGUAGE PLPGSQL STABLE;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Lease" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "LeaseInvoice" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "MaintenanceOrder" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "PlanInvoice" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "id" SET DEFAULT nanoid();

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nanoid();
