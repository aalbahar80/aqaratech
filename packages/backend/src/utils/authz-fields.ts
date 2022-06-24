import { Prisma } from '@prisma/client';

const tenant = Prisma.validator<Prisma.TenantSelect>()({
  id: true,
  organizationId: true,
});

const portfolio = Prisma.validator<Prisma.PortfolioSelect>()({
  id: true,
  organizationId: true,
});

const property = Prisma.validator<Prisma.PropertySelect>()({
  id: true,
  portfolioId: true,
  portfolio: { select: { id: true, organizationId: true } },
});

const unit = Prisma.validator<Prisma.UnitSelect>()({
  id: true,
  propertyId: true,
  property: {
    select: {
      id: true,
      portfolioId: true,
      portfolio: { select: { id: true, organizationId: true } },
    },
  },
});

const lease = Prisma.validator<Prisma.LeaseSelect>()({
  unit: {
    select: {
      id: true,
      propertyId: true,
      property: {
        select: {
          id: true,
          portfolioId: true,
          portfolio: {
            select: {
              id: true,
              organizationId: true,
            },
          },
        },
      },
    },
  },
  tenant: {
    select: {
      id: true,
      organizationId: true,
    },
  },
});

const leaseInvoice = Prisma.validator<Prisma.LeaseInvoiceSelect>()({
  lease: {
    select: {
      unit: {
        select: {
          id: true,
          propertyId: true,
          property: {
            select: {
              id: true,
              portfolioId: true,
              portfolio: {
                select: {
                  id: true,
                  organizationId: true,
                },
              },
            },
          },
        },
      },
    },
  },
});

/**
 * Get fields necessary for ability checks
 */
export const selectForAuthz = {
  tenant,
  portfolio,
  property,
  unit,
  lease,
  leaseInvoice,
};
