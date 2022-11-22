export const getAddress = (property: {
	area: string | null;
	block: string | null;
	number: string | null;
}) => {
	return [property.area, 'ق', property.block, 'م', property.number]
		.filter(Boolean)
		.join(' ');
};

export const getUnitLabel = (unit: {
	type: string | null;
	unitNumber: string;
}) => {
	return `${unit.type ?? ''} ${unit.unitNumber}`;
};
