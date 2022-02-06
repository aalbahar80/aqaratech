/* eslint-disable @typescript-eslint/no-unused-vars */
export {};

type Rstr<T> = (str: string) => T;

const rstr: Rstr<any> = (str: string) => 1;

// type A<B> = ReturnType<typeof rstr<B extends <infer C> ? C : never>>;
type A<B> = B extends Rstr<infer C> ? C : B;

const a: A<number> = (str: string) => 1;

type ReturnsAny = (str: string) => string;
const returnsAny: ReturnsAny = (str: string) => 'some string';

type D = A<ReturnsAny>;

function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0];
}
const s = firstElement(['a', 'b', 'c']);
