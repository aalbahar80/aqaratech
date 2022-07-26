-- CreateTable
CREATE TABLE "OrganizationSettings" (
    "id" VARCHAR(12) NOT NULL DEFAULT nanoid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expenseCategoryTree" JSONB NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "OrganizationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSettings_organizationId_key" ON "OrganizationSettings"("organizationId");
