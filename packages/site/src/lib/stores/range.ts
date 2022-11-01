import { defaultRange } from '$lib/components/charts/utils/date-range';
import { writable } from 'svelte/store';

export const range = writable<number>(defaultRange);
