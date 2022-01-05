import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ToastNotificationProps } from 'carbon-components-svelte/types/Notification/ToastNotification.svelte';

interface ToastItem {
	id: number;
	component: ToastNotificationProps;
}

export const toasts: Writable<ToastItem[]> = writable([]);

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
export const addToast = (toast: ToastNotificationProps) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	// Setup some sensible defaults for a toast.
	const defaults = {
		id,
		component: toast,
		// dismissible: true,
		// timeout: 2000,
	};

	// Push the toast to the top of the list of toasts
	// const t = { ...defaults, ...toast };
	toasts.update((all) => [defaults, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	// if (t.timeout) setTimeout(() => dismissToast(id), t.timeout);
};
