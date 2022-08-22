import { Prisma } from '@prisma/client';
import { satisfies } from '@self/utils';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';

type LocationFilter = Prisma.ExpenseWhereInput | Prisma.UnitWhereInput;

export const parseLocationFilter = ({
  filter,
  entity,
}: {
  filter?: DashboardFilterDto;
  entity: 'Expense' | 'Unit';
}) => {
  let locationFilter;
  if (filter?.unitId) {
    const key = entity === 'Unit' ? 'id' : 'unitId';
    locationFilter = { [key]: filter.unitId };
  } else if (filter?.propertyId) {
    locationFilter = { propertyId: filter.propertyId };
  } else {
    locationFilter = { portfolioId: filter?.portfolioId };
  }

  return satisfies<LocationFilter>()(locationFilter);
};
