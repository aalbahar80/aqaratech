import { z } from 'zod';
import type { UnitData } from './select';

export const defaultForm: Omit<UnitData, 'id' | 'createdAt' | 'updatedAt'> = {
	size: null,
	type: null,
	unitNumber: null,
	bed: null,
	bath: null,
	floor: null,
};

export const formSchema = z.object({
	id: z.undefined(),
	createdAt: z.undefined(),
	updatedAt: z.undefined(),
});

export default { formSchema, defaultForm };
