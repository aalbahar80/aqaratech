<script lang="ts" context="module">
	import { get, readable } from 'svelte/store';
	import { createClient, operationStore } from '@urql/svelte';
	import { browser, dev } from '$app/env';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import { dedupExchange, ssrExchange, fetchExchange } from '@urql/svelte';
	import rawSchema from '../FROMSCRIPTschema.json';
	import type { GraphCacheConfig } from '$generated/graphql';
	import { Auth0Client } from '@auth0/auth0-spa-js';
	import auth from '$lib/services/auth';
	import { isAuthenticated, user } from '$lib/stores/auth';

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch, stuff, session, page }) => {
		// check session. If user not logged in, redirect to login page
		// let auth0Client = await auth.createClient();
		// console.log(auth0Client);
		// console.log('session is: ', JSON.parse(session));
		console.log('layout session:', session.user);
		const unprotected = ['/login', '/logout', '/callback', '/landing'];
		if (
			(session.user === '' || session.user === null) &&
			!unprotected.includes(page.path) &&
			browser
		) {
			return { redirect: '/landing', status: 302 };
		}

		// if (browser && !get(isAuthenticated)) {

		// 	return { redirect: '/login', status: 302 };
		// }

		const cache = cacheExchange<GraphCacheConfig>({
			schema: rawSchema,
			resolvers: {
				query_root: {
					clients_by_pk: (parent, args, cache, info) => {
						return { __typename: 'clients', id: args.id };
					},
					properties_by_pk: (parent, args, cache, info) => {
						return { __typename: 'properties', id: args.id };
					},
					units_by_pk: (parent, args, cache, info) => {
						return { __typename: 'units', id: args.id };
					},
					leases_by_pk: (parent, args, cache, info) => {
						return { __typename: 'leases', id: args.id };
					},
					tenants_by_pk: (parent, args, cache, info) => {
						return { __typename: 'tenants', id: args.id };
					},
					transactions_by_pk: (parent, args, cache, info) => {
						return { __typename: 'transactions', id: args.id };
					},
					expenses_by_pk: (parent, args, cache, info) => {
						return { __typename: 'expenses', id: args.id };
					},
					listings_by_pk: (parent, args, cache, info) => {
						return { __typename: 'listings', id: args.id };
					},
					maintenance_orders_by_pk: (parent, args, cache, info) => {
						return { __typename: 'maintenance_orders', id: args.id };
					},
				},
			},
		});

		const client = await createClient({
			// Pass in the fetch from sveltekit to have access to serialized requests during hydration
			fetch,
			// dev: browser && dev
			// url: 'https://hasura-xf70.onrender.com/v1/graphql',
			// TODO: change this url in prod
			// url: 'http://localhost:3000/api/graphql',
			url: '/api/graphql',
			// fetchOptions: {
			// 	headers: {
			// 		'x-hasura-admin-secret': 'myadminsecret',
			// 	},
			// 	// credentials: 'include',
			// },
			exchanges: [
				// devtoolsExchange,
				dedupExchange,
				cache,
				//ssr,
				fetchExchange,
			],
		});

		return {
			stuff: {
				...stuff,
				client,
				query: async (query, variables, context) => {
					const store = operationStore(query, variables, context);
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
	import '../styles/tailwind.css';
	import 'carbon-components-svelte/css/all.css';

	import Wrapper from '../Wrapper.svelte';
	import Header from '$components/Header.svelte';
	import { onDestroy } from 'svelte';
	import { setClient } from '@urql/svelte';
	import type { Client } from '@urql/svelte';
	import { Content, Grid, Row, Column } from 'carbon-components-svelte';

	export let client: Client;
	setClient(client);
</script>

<Header />
<Content>
	<slot />
</Content>
