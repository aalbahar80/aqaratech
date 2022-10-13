import { ResponseError } from '$api/openapi';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

interface ToastItem {
	id: number;
	duration?: number;
	props: { title: string; subtitle?: string; kind: 'success' | 'error' };
}

export const toasts: Writable<ToastItem[]> = writable([]);

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
export const addToast = (toast: Omit<ToastItem, 'id'>) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	// Setup some sensible defaults for a toast.
	const defaults = {
		dismissible: true,
		duration: 10 * 1000,
	};

	const newToast: ToastItem = { id, ...defaults, ...toast };

	// Push the toast to the top of the list of toasts
	// const t = { ...defaults, ...toast };
	toasts.update((all) => [newToast, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (newToast.duration) setTimeout(() => dismissToast(id), newToast.duration);
};

export const addSuccessToast = (subtitle = '') => {
	addToast({
		props: {
			kind: 'success',
			title: 'Success',
			subtitle,
		},
	});
};

export const addErrorToast = (subtitle = '') => {
	addToast({
		props: {
			kind: 'error',
			title: 'Error',
			subtitle,
		},
	});
};

/**
 * Attempts to parse a `ResponseError` into a toast message.
 */
export const handleApiError = async (error: any) => {
	let message = '';
	console.error(error);
	if (error instanceof ResponseError) {
		const data = await error.response.json();
		console.error(data);
		message = data.message;
	}
	addToast({
		props: {
			kind: 'error',
			title: 'Error',
			subtitle: message,
		},
	});
};
