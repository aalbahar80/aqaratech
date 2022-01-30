<script lang="ts" context="module">
	import Header from '$components/Header.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { logger } from '$lib/config/logger';
	import { urqlClient } from '$lib/config/urql_client';
	import type { Load } from '@sveltejs/kit';
	import type {
		Client,
		OperationContext,
		TypedDocumentNode,
	} from '@urql/svelte';
	import { operationStore, setClient } from '@urql/svelte';
	import '../styles/tailwind.css';
	import 'carbon-components-svelte/css/all.css';
	import type { DocumentNode } from 'graphql';
	import { get } from 'svelte/store';
	import LogRocket from 'logrocket';

	LogRocket.init('n4p0hb/svelte14dec');

	const publicPages = [
		'/',
		'/auth/login',
		'/auth/callback',
		'/auth/logout',
		'/landing',
	];

	export const load: Load = async ({ fetch, stuff, session }) => {
		logger.debug(!session.user, '__layout.svelte ~ 27');
		if (!session.user) {
			return {
				status: 302,
				redirect: '/auth/login',
				// maxage: 0,
			};
		}
		logger.warn(session.userId, '__layout.svelte ~ 38');
		LogRocket.identify(session.userId);

		const client = urqlClient(fetch);

		return {
			stuff: {
				...stuff,
				client,
				query: async (
					query: string | DocumentNode | TypedDocumentNode,
					variables:
						| { [key: string]: string | number | boolean | null }
						| null
						| undefined,
					context: Partial<OperationContext & { pause: boolean }> | undefined,
				) => {
					const store = operationStore<any, any>(query, variables, context);
					const result = await client
						.query(store.query, store.variables, store.context)
						.toPromise();
					Object.assign(get(store), result);

					return store;
				},
			},
			props: { client },
		};
	};
</script>

<script lang="ts">
	export let client: Client;
	setClient(client);
</script>

<div class="max-h-screen">
	<Header />
	<div class="mt-8 mx-4 lg:mx-8">
		<ToastParent />
		<slot />
	</div>
</div>
