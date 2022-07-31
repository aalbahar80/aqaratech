import { falsyToNull } from '$lib/zodTransformers';
import { z } from 'zod';

export const zodIsDateRequired = () =>
	z.string().min(1, { message: 'Required' });

export const zodIsDateOptional = () =>
	z.string().nullable().transform(falsyToNull);
