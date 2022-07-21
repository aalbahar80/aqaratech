/*
  Warnings:

  - You are about to drop the column `email` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Tenant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "email";
