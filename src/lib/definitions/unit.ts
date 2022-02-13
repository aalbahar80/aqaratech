import type { UnitData } from './select';

export const defaultForm: Omit<UnitData, 'id' | 'createdAt' | 'updatedAt'> = {
	size: null,
	type: null,
	unitNumber: null,
	bed: null,
	bath: null,
	floor: null,
};

export const validation = false;

export default { defaultForm };
