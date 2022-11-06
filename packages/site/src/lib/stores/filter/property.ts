import { writable } from '$lib/utils/sandboxed';

export const property = writable<string | null | undefined>(undefined);
