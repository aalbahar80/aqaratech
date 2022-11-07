export interface GroupedByMonth {
	date: string;
	amount: number;
}

export class GroupByMonthDto implements GroupedByMonth {
	date: string;
	amount: number;
}

export class IncomeByMonthDto {
	total: GroupByMonthDto[];
	paid: GroupByMonthDto[];
	unpaid: GroupByMonthDto[];
}

export class GroupByCategoryDto {
	categoryId: string;
	amount: number;
}
