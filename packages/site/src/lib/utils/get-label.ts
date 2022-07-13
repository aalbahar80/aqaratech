import type { PropertyDto, UnitDto } from '@self/sdk';

// TODO shared lib
export const getAddress = (
	property: Pick<PropertyDto, 'area' | 'block' | 'number'>,
) => {
	return [property.area, 'ق', property.block, 'م', property.number]
		.filter(Boolean)
		.join(' ');
};

export const getUnitLabel = (unit: Pick<UnitDto, 'type' | 'unitNumber'>) => {
	return `${unit.type} ${unit.unitNumber}`;
};
