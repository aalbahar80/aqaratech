-- CreateIndex
CREATE INDEX "Expense_postAt_idx" ON "Expense"("postAt");

-- CreateIndex
CREATE INDEX "LeaseInvoice_postAt_idx" ON "LeaseInvoice"("postAt");

-- CreateIndex
CREATE INDEX "Role_userId_idx" ON "Role"("userId");

-- CreateIndex
CREATE INDEX "Role_organizationId_idx" ON "Role"("organizationId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
