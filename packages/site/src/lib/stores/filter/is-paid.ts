import { writable } from '$lib/utils/sandboxed';

export const isPaid = writable<true | false | undefined>(undefined);
