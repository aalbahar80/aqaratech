// sandboxedStore.js
//
import { browser } from '$app/environment';
import { getStores } from '$app/stores';
import { get, writable as svelteWritable } from 'svelte/store';

const storesKey = `sandbox_${crypto.randomUUID()}`;

/**
 * Creates a façade for a writable store that is a sandboxed store that may be used as a
 * global variable. It must be initialized during component initialization.
 *
 * This store is contextual since it is added to the context of the root component. This means that
 * it is unique to each request on the server rather than shared across multiple requests handled
 * by the same server at the same time, allowing it to be used as a global variable while also
 * holding user-specific data.
 *
 * We must subscribe to this store during component initialization before we can use it. It is
 * utilized in the same way as [SvletKit's app stores](https://kit.svelte.dev/docs/modules#$app-stores).
 *
 * _NB: In async methods, set the store before any `await`—otherwise, the context will be lost once
 * the promise is fulfilled._
 *
 * @param {any} initialValue An initial value to set the store to
 * @param {string} [key] An optional key name for the store
 */
export function writable(initialValue, key) {
	key = key ? `${key}_${crypto.randomUUID()}` : crypto.randomUUID();

	function setStore(value) {
		try {
			const { page: sessionStore } = getStores();
			const { stuff: session } = get(sessionStore);

			const store = session?.[storesKey]?.[key];
			const currentValue = store ? store.value : initialValue;

			if (!store || value !== currentValue) {
				if (!session[storesKey]) session[storesKey] = {};
				session[storesKey][key] = {
					value,
					subscribers: store?.subscribers || [],
				};

				// alert subscribers
				if (store) {
					store.subscribers.forEach((fn) => {
						fn(value);
					});

					// return the updated value
					return value;
				}
			}
		} catch (error) {
			// if we reached this exception, it meant that the store had not yet been initialized
			return value;
		}
	}

	const sandboxedWritable = {
		set: setStore,
		subscribe: (fn) => {
			try {
				const { page: sessionStore } = getStores();
				const { stuff: session } = get(sessionStore);

				const store = session?.[storesKey]?.[key];
				const currentValue = store ? store.value : initialValue;

				// call the subscription function with the current value
				fn(currentValue);

				// register the subscriber
				if (!session[storesKey]) session[storesKey] = {};
				session[storesKey][key] = {
					value: store?.value || initialValue,
					subscribers: [...(store?.subscribers || []), fn],
				};
			} catch (error) {
				// if we reached this exception, it meant that the store had not yet been initialized
				// call the subscription function with the initial value
				fn(initialValue);
			}

			// return the unsubscribe function
			return function unsubscribe() {
				try {
					const { page: sessionStore } = getStores();
					const { stuff: session } = get(sessionStore);

					// unregister the subscriber
					const { subscribers } = session[storesKey][key];
					subscribers.splice(subscribers.indexOf(fn), 1);
				} catch (error) {
					// if we reached this exception, it meant that the store had not yet been initialized
					// ignore
				}
			};
		},
		update: (fn) => {
			try {
				const { page: sessionStore } = getStores();
				const { stuff: session } = get(sessionStore);

				const store = session?.[storesKey]?.[key];
				const currentValue = store ? store?.value : initialValue;

				setStore(fn(currentValue));
			} catch (error) {
				// if we reached this exception, it meant that the store had not yet been initialized
				setStore(fn(initialValue));
			}
		},
	};

	return browser ? svelteWritable(initialValue) : sandboxedWritable;
}
export { writable as sandboxedWritable };
