import { Prisma } from '@prisma/client';

export const lease: Prisma.LeaseSelect = {
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
};

/**
 * Get fields necessary for ability checks
 */
export const selectForAuthz = { lease };
