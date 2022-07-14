type SearchParam = string | null;
type FindIdFromArray = string | undefined;

export interface PredefinedProperty {
	portfolioId: SearchParam;
}

export interface PredefinedUnit {
	portfolioId: FindIdFromArray;
	propertyId: SearchParam;
}

export interface PredefinedExpense {
	portfolioId: FindIdFromArray | SearchParam;
	propertyId: FindIdFromArray | SearchParam;
	unitId: FindIdFromArray | SearchParam;
}

// export interface PredefinedLease extends PredefinedUnit {
// 	tenantId: SearchParam;
// }
