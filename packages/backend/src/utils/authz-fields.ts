const property = {
  id: true,
  portfolioId: true,
  portfolio: { select: { id: true, organizationId: true } },
};

const unit = {
  id: true,
  propertyId: true,
  property: {
    select: {
      id: true,
      portfolioId: true,
      portfolio: { select: { id: true, organizationId: true } },
    },
  },
};

const lease = {
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

const leaseInvoice = {
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
};

/**
 * Get fields necessary for ability checks
 */
export const selectForAuthz = { property, unit, lease, leaseInvoice };
