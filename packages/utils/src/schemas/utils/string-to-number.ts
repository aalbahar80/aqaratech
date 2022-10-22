import { z } from 'zod';

export const stringToNumber = z.string().transform((val) => parseInt(val));
