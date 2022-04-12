import trpc from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/common';
import { falsyToNull, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	area: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	block: z
		.string()
		.min(1, { message: 'Required' })
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Block must contain only numbers',
		})
		.transform(trim)
		.transform(falsyToNull),
	street: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	avenue: z.string().transform(trim).transform(falsyToNull).nullable(),
	number: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	clientId: z.string().uuid(),
});

const PropertyModelBase: IEntity<'properties'> = {
	name: 'properties',
	singular: 'property',
	plural: 'properties',
	defaultForm: () => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
		clientId: '',
	}),
	relationalFields: ['clientId'],
};

interface ILabel {
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
}

const getLabel = (item: ILabel, full = false) => {
	if (full) {
		return concatIfExists([
			item.area,
			'قطعة',
			item.block,
			item.street,
			'مبنى',
			item.number,
		]);
	}
	return concatIfExists([item.area, 'ق', item.block, 'م', item.number]);
};

const getOptions = async (parentId: string) => {
	const uuid = z.string().uuid().safeParse(parentId);
	if (!uuid.success) {
		return [];
	}
	const result = await trpc().query('properties:search:parent', parentId);
	const options = result.map((item) => ({
		value: item.id,
		label: getLabel(item),
	}));
	return options;
};

export const PropertyModel = {
	...PropertyModelBase,
	schema,
	getLabel,
	getOptions,
};
