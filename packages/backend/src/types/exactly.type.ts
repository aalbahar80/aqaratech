import { Function } from 'ts-toolbelt';
/**
 * A generic type utility that can be used to restrict a
 * class to only known properties.
 * 1. Doesn't allow extra properties.
 * 2. Doesn't allow missing "required" properties.
 * 3. TODO: Doesn't allow missing "optional (?)" properties.
 */
export type Exactly<T extends object, U> = Function.Exact<U, T>;
