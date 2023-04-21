import { writable } from 'svelte/store';

export const width = writable('max-w-7xl');
export const widthNumber = writable(9999); // sidebar is hidden by default to prevent fouc
