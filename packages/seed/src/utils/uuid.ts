import { randomUUID } from 'node:crypto';

export const ID = () => {
	return randomUUID();
};
