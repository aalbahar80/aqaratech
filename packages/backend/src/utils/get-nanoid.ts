import { customAlphabet } from 'nanoid';

export const generateId = (): string =>
  customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)();
