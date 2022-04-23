import trpc from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/common';
import { falsyToNull, falsyToNullExceptZero, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	unitNumber: z
		.string()
		.refine((val) => val.trim().length > 0, { message: 'Required' })
		.transform(trim),
	bed: z
		.union([z.literal(''), z.null(), z.undefined(), z.number().nonnegative()])
		.transform(falsyToNullExceptZero),
	bath: z
		.union([z.literal(''), z.null(), z.undefined(), z.number().nonnegative()])
		.transform(falsyToNullExceptZero),
	size: z
		.union([z.literal(''), z.null(), z.undefined(), z.number().nonnegative()])
		.transform(falsyToNullExceptZero),
	floor: z
		.union([z.literal(''), z.null(), z.undefined(), z.number()])
		.transform(falsyToNullExceptZero),
	usage: z.string().nullable().transform(trim).transform(falsyToNull),
	type: z.string().nullable().transform(trim).transform(falsyToNull),
	marketRent: z
		.number()
		.nonnegative()
		.nullish()
		.transform(falsyToNullExceptZero),
	propertyId: z.string().uuid(),
});

const getOptions = async ({ parentId }: { parentId?: string | undefined }) => {
	const result = await trpc.query('units:list', { propertyId: parentId });
	const options = result.data.map((item) => ({
		value: item.id,
		label: getLabel(item),
	}));
	return options;
};

const UnitModelBasic: IEntity<'units'> = {
	name: 'units',
	singular: 'unit',
	singularCap: 'Unit',
	plural: 'units',
	pluralCap: 'Units',
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

interface ILabel {
	type: string | null;
	unitNumber: string;
}

export const getLabel = (item: ILabel) =>
	concatIfExists([item.type, item.unitNumber]);

export const UnitModel = {
	...UnitModelBasic,
	schema,
	getLabel,
	getOptions,
	basicFields: [
		'type',
		'unitNumber',
		'bed',
		'bath',
		'size',
		'marketRent',
		'floor',
		'usage',
	] as const,
	// relationalFields: ['clientId', 'propertyId'] as const,
};
