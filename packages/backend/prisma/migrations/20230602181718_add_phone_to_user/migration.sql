-- AlterTable
ALTER TABLE "User" ADD COLUMN "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "phone" TEXT;
