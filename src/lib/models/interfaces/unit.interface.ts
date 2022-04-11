import { concatIfExists } from '$lib/utils/common';
import { falsyToNull, falsyToNullExceptZero, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	unitNumber: z
		.string()
		.min(1)
		.transform(trim)
		.refine((val) => val && val.length > 0),
	bed: z
		.number()
		.min(1)
		.nullish()
		.transform((val) => (val === undefined ? null : val)),
	bath: z
		.number()
		.min(1)
		.nullish()
		.transform((val) => (val === undefined ? null : val)),
	size: z
		.number()
		.min(1)
		.nullish()
		.transform((val) => (val === undefined ? null : val)),
	floor: z.number().nullish().transform(falsyToNullExceptZero),
	usage: z.string().transform(trim).transform(falsyToNull).nullable(),
	type: z.string().transform(trim).transform(falsyToNull).nullable(),
	marketRent: z
		.number()
		.nonnegative()
		.nullish()
		.transform(falsyToNullExceptZero),
	propertyId: z.string().uuid(),
});

interface ILabel {
	type: string | null;
	unitNumber: string;
}

const UnitModelBasic: IEntity<'units'> = {
	name: 'units',
	singular: 'unit',
	plural: 'units',
	defaultForm: () => ({
		unitNumber: '',
		bed: null,
		bath: null,
		size: null,
		marketRent: null,
		floor: null,
		usage: '',
		type: '',
		propertyId: '',
	}),
};

export const UnitModel = {
	...UnitModelBasic,
	schema,
	getLabel: (item: ILabel) => concatIfExists([item.type, item.unitNumber]),
};
