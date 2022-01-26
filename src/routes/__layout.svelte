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
	import { browser } from '$app/env';

	export const prerender = false;

	export const load: Load = async ({ fetch, stuff, session }) => {
		logger.debug({ session }, '__layout.svelte ~ 29');
		const res = await fetch('/auth/user.json');
		const { user } = await res.json();
		logger.debug({ user }, '__layout.svelte ~ 27');
		const shouldRedirect = isEmpty(user);
		logger.warn({ shouldRedirect }, '__layout.svelte ~ 23');
		if (browser && !user) {
			return {
				status: 302,
				redirect: '/auth/login',
				// redirect: '/landing',
				// maxage: 0,
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
