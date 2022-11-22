import { writable } from '$lib/utils/sandboxed';

export const unit = writable<string | null | undefined>(undefined);
