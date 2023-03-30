-- CreateIndex
CREATE INDEX "Portfolio_fullName_idx" ON "Portfolio" USING GIN(
    "fullName" gin_trgm_ops
);

-- CreateIndex
CREATE INDEX "Portfolio_label_idx" ON "Portfolio" USING GIN(
    "label" gin_trgm_ops
);

-- CreateIndex
CREATE INDEX "Tenant_fullName_idx" ON "Tenant" USING GIN(
    "fullName" gin_trgm_ops
);

-- CreateIndex
CREATE INDEX "Tenant_label_idx" ON "Tenant" USING GIN("label" gin_trgm_ops);
