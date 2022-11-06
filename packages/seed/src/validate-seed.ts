import type { PreprocessedSeed } from './preprocess-seed';

export const validateSeed = (seed: PreprocessedSeed) => {
	validateExpenseRelations(seed);
};

const validateExpenseRelations = (seed: PreprocessedSeed) => {
	const { expenses, properties, units } = seed;

	for (const expense of expenses) {
		// get expense.propertyId, check that the property.portfolioId matches the expense.portfolioId
		const property = properties.find((p) => p.id === expense.propertyId);

		if (
			expense.propertyId &&
			property &&
			property.portfolioId !== expense.portfolioId
		) {
			throw new Error(
				`Property portfolioId ${property.portfolioId} does not match expense portfolioId ${expense.portfolioId}`,
			);
		}

		// get expense.unitId, check that the unit.portfolioId matches the expense.portfolioId
		const unit = units.find((u) => u.id === expense.unitId);

		if (expense.unitId && unit && unit.portfolioId !== expense.portfolioId) {
			throw new Error(
				`Unit portfolioId ${unit.portfolioId} does not match expense portfolioId ${expense.portfolioId}`,
			);
		}
	}
};
