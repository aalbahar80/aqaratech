/*
  Warnings:

  - Added the required column `roleType` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ORGADMIN', 'PORTFOLIO', 'TENANT');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "roleType" "RoleType" NOT NULL;
