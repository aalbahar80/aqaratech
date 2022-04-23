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
		.refine((val) => val.match(/^[0-9]+$/) !== null, {
			message: 'Block must contain only numbers',
		})
		.transform(trim)
		.transform(falsyToNull),
	street: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	avenue: z.string().nullish().transform(trim).transform(falsyToNull),
	number: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	clientId: z.string().uuid(),
});

const getOptions = async ({ parentId }: { parentId?: string | undefined }) => {
	const result = await trpc.query('properties:list', { clientId: parentId });
	const options = result.data.map((item) => ({
		value: item.id,
		label: getLabel(item),
	}));
	return options;
};

const PropertyModelBase: IEntity<'properties'> = {
	name: 'properties',
	singular: 'property',
	singularCap: 'Property',
	plural: 'properties',
	pluralCap: 'Properties',
	defaultForm: () => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
		clientId: '',
	}),
};

interface ILabel {
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
}

export const getLabel = (item: ILabel, full = false) => {
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

export const PropertyModel = {
	...PropertyModelBase,
	schema,
	getLabel,
	getOptions,
	basicFields: ['area', 'block', 'street', 'avenue', 'number'] as const,
	relationalFields: ['clientId'] as const,
};
