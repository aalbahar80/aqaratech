import { z } from 'zod';

export const zodnanoid = z.string().min(12).max(12);
