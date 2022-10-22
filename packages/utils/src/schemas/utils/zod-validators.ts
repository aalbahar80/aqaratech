import { z } from 'zod';

// TODO: add date validator
/**
 * Currently only checks for a string
 */
export const zodIsDateOnlyOptional = () => z.string().nullish();

// TODO: add date validator
/**
 * Currently only checks for a string
 */
export const zodIsDateOnlyRequired = () => z.string();
