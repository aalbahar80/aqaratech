import { randomUUID } from 'node:crypto';

export const generateId = (): string => randomUUID();
