<script lang="ts" context="module">
	import Header from '$components/Header.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { logger } from '$lib/config/logger';
	import type { Load } from '@sveltejs/kit';
	import type {
		Client,
		OperationContext,
		TypedDocumentNode,
	} from '@urql/svelte';
	import { operationStore, setClient } from '@urql/svelte';
	import { Column, Content, Grid, Row } from 'carbon-components-svelte';
	import '../styles/tailwind.css';
	import 'carbon-components-svelte/css/all.css';
	import type { DocumentNode } from 'graphql';
	import isEmpty from 'just-is-empty';
	import { urqlClient } from '$lib/config/urql_client';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export const load: Load<CLoad> = async ({ fetch, stuff, session }) => {
		logger.debug({ session }, '__layout.svelte ~ 29');
		const shouldRedirect = isEmpty(session.user);
		logger.warn({ shouldRedirect }, '__layout.svelte ~ 23');
		// eslint-disable-next-line no-constant-condition
		if (shouldRedirect) {
			// set timeout of 10 seconds before redirecting
			await new Promise((resolve) => setTimeout(resolve, 20));
			return {
				status: 302,
				redirect: '/auth/login',
				// headers: { location: '/auth/login' },
			};
		}

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

<Header />
<Content>
	<Grid>
		<Row>
			<Column>
				<ToastParent />
				<slot />
			</Column>
		</Row>
	</Grid>
</Content>
