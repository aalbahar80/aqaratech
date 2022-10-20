import { z } from 'zod';

export const isID = z.string().uuid();
