import { falsyToNull } from 'src/zod/zodTransformers';
import { z } from 'zod';

export const zodIsDateRequired = () =>
	z.string().min(1, { message: 'Required' });

export const zodIsDateOptional = () =>
	z.string().nullish().transform(falsyToNull);
