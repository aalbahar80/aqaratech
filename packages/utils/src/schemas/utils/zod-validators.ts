import { z } from 'zod';
import { falsyToNull } from './zodTransformers';

export const zodIsDateRequired = () =>
	z.string().min(1, { message: 'Required' });

export const zodIsDateOptional = () =>
	z.string().nullish().transform(falsyToNull);
