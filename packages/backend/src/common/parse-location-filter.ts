import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';

// type LocationFilter = Prisma.ExpenseWhereInput | Prisma.UnitWhereInput;

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
		locationFilter = { [key]: filter.unitId } as const;
	} else if (filter?.propertyId) {
		locationFilter = { propertyId: filter.propertyId } as const;
	} else {
		locationFilter = { portfolioId: filter?.portfolioId } as const;
	}

	return locationFilter;
};
