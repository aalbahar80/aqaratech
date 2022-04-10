import { concatIfExists } from '$lib/utils/common';
import { falsyToNull, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/classes/entity.model';
import type { IProperty } from '$models/interfaces/property.interface';
import { z } from 'zod';
import type { IDeserializable } from '../interfaces/deserializable.interface';

export class PropertyModel
	implements IEntity<'properties'>,  IProperty, IDeserializable<IProperty>
{
	static singular = 'property';
	static plural = 'properties';
	static schema = z.object({
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

	defaultForm = () => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
		clientId: '',
	});

	deserialize(input: IProperty): this {
		Object.assign(this, input);
		return this;
	}

	static getLabel = (input: IProperty, short = true): string => {
		if (short) {
			return concatIfExists([input.area, 'ق', input.block, 'م', input.number]);
		}
		return concatIfExists([
			input.area,
			'قطعة',
			input.block,
			input.street,
			'مبنى',
			input.number,
		]);
	};

	public id?: string;
	// public clientId?: string;
	// public createdAt?: Date;
	// public updatedAt?: Date;
	// public area?: string | null;
	// public block?: string | null;
	// public avenue?: string | null;
	// public street?: string | null;
	// public number?: string | null;
	// public long?: number | null;
	// public lat?: number | null;
}

// const one = new PropertyModel().deserialize({
// 	id: '123',
// 	area: 'abc',
// });

// one.area;
// one.clientId;
