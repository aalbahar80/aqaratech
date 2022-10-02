/**
 * Removes null and undefined from all properties of T.
 */
export type Strict<T> = { [P in keyof T]-?: NonNullable<T[P]> };
