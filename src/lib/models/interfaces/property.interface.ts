import type { InferQueryOutput } from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/common';
import { falsyToNull, trim } from '$lib/zodTransformers';
import type { IEntity, Searchable } from '$models/interfaces/entity.interface';
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

interface IProperty<T extends 'properties'>
	extends IEntity<T, typeof schema>,
		Searchable<T> {
	getLabel: (item: InferQueryOutput<`${T}:search`>[number]) => string;
}

export const PropertyModel: IProperty<'properties'> = {
	singular: 'property',
	plural: 'properties',
	schema,
	defaultForm: () => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
		clientId: '',
	}),
	getLabel: (item, full = false) => {
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
	},
};
