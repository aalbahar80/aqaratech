import { Property, Unit } from '@prisma/client';

export const getAddress = (
	property: Pick<Property, 'area' | 'block' | 'number'>,
) => {
	return [property.area, 'ق', property.block, 'م', property.number]
		.filter(Boolean)
		.join(' ');
};

export const getUnitLabel = (unit: Pick<Unit, 'type' | 'unitNumber'>) => {
	return `${unit.type} ${unit.unitNumber}`;
};
