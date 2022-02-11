import { Field } from '$components/form/Field';
import { Prisma } from '@prisma/client';

export type UnitData = Prisma.UnitGetPayload<typeof entityData>;

export const entityData = Prisma.validator<Prisma.UnitArgs>()({
	select: {
		id: true,
		size: true,
		type: true,
		unitNumber: true,
		bed: true,
		bath: true,
		floor: true,
	},
});

export const defaultForm: Omit<UnitData, 'id'> = {
	size: null,
	type: null,
	unitNumber: null,
	bed: null,
	bath: null,
	floor: null,
};

export const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'is_vacant',
		title: 'Vacant?',
		editable: false,
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'rent_market',
		title: 'Market Rent',
		inputType: 'number',
		searchType: 'number',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'size',
		title: 'Size m²',
		inputType: 'number',
		searchType: 'number',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'type',
		title: 'Type',
		searchType: 'text',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'unit_number',
		title: 'Number',
		searchType: 'text',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'usage',
		title: 'Usage',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'bed',
		title: 'Beds',
		inputType: 'number',
		searchable: false,
	}),
	new Field({
		fieldName: 'bath',
		title: 'Baths',
		inputType: 'number',
		searchable: false,
	}),
	new Field({
		fieldName: 'floor',
		title: 'Floor',
		searchable: false,
	}),
];

export const validation = false;

export default { defaultForm };
