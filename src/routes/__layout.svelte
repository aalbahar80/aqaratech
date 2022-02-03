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
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	import { navigating, session } from '$app/stores';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	// import PrismaClient from '$lib/config/prisma';

	logger.warn('layout module script tag', '__layout.svelte ~ 20');

	export const load: Load = async ({ fetch, stuff, session }) => {
		logger.warn('load function initial', '__layout.svelte ~ 36');
		logger.debug(!session.user, '__layout.svelte ~ 27');
		// if (!session.user) {
		if (false) {
			return {
				status: 302,
				redirect: '/auth/login',
				// maxage: 0,
			};
		}
		logger.warn('load function after user check', '__layout.svelte ~ 45');
		logger.debug(session.userId, '__layout.svelte ~ 38');

		// if (!browser) const prismaClient = new PrismaClient();

		const client = urqlClient(fetch);

		return {
			stuff: {
				...stuff,
				// prismaClient,
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
	logger.warn('layout normal script tag', '__layout.svelte ~ 78');
	onMount(() => {
		logger.warn('layout on mount', '__layout.svelte ~ 82');
		if (!window.location.href.includes('localhost')) {
			// TODO choose one of posthog or logrocket
			posthog.init('phc_9yCZuf3iVjCaKEH8TDb4sLaN2tg3hnyoIpqRIjGjNiz', {
				api_host: 'https://app.posthog.com',
			});
			posthog.identify($session.userId);
			// posthog.capture('my event', { property: 'value' });

			LogRocket.init('n4p0hb/svelte14dec');
			LogRocket.identify($session.userId);
		}
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div class="max-h-screen">
	<Header />
	<div class="mt-8 mx-4 lg:mx-8">
		<ToastParent />
		<slot />
	</div>
</div>
