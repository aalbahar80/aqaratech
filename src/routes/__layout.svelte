<script lang="ts" context="module">
	import Header from '$components/Header.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import type { GraphCacheConfig } from '$generated/graphql';
	import type { Load } from '@sveltejs/kit';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import type {
		Client,
		OperationContext,
		TypedDocumentNode,
	} from '@urql/svelte';
	import {
		createClient,
		dedupExchange,
		fetchExchange,
		operationStore,
		setClient,
	} from '@urql/svelte';
	import { Column, Content, Grid, Row } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import type { DocumentNode } from 'graphql';
	import isEmpty from 'just-is-empty';
	import { get } from 'svelte/store';
	import rawSchema from '../FROMSCRIPTschema.json';
	import '../styles/tailwind.css';

	export const load: Load<CLoad> = ({ fetch, stuff, session }) => {
		console.log('🚀 ~ file: __layout.svelte ~ line 30 ~ session', session);
		const shouldRedirect = isEmpty(session.user);
		console.log(
			'🚀 ~ file: __layout.svelte ~ line 31 ~ shouldRedirect',
			shouldRedirect,
		);
		if (shouldRedirect) {
			// if (false) {
			// return { redirect: '/auth/login', status: 302 };
			return {
				status: 302,
				redirect: '/auth/login',
				// headers: { location: '/auth/login' },
			};
		}

		const cacheConfig = cacheExchange<GraphCacheConfig>({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			schema: rawSchema,
			resolvers: {
				query_root: {
					clients_by_pk: (parent, args) => ({
						__typename: 'clients',
						id: args.id,
					}),
					properties_by_pk: (parent, args) => ({
						__typename: 'properties',
						id: args.id,
					}),
					units_by_pk: (parent, args) => ({ __typename: 'units', id: args.id }),
					leases_by_pk: (parent, args) => ({
						__typename: 'leases',
						id: args.id,
					}),
					tenants_by_pk: (parent, args) => ({
						__typename: 'tenants',
						id: args.id,
					}),
					transactions_by_pk: (parent, args) => ({
						__typename: 'transactions',
						id: args.id,
					}),
					expenses_by_pk: (parent, args) => ({
						__typename: 'expenses',
						id: args.id,
					}),
					listings_by_pk: (parent, args) => ({
						__typename: 'listings',
						id: args.id,
					}),
					maintenance_orders_by_pk: (parent, args) => ({
						__typename: 'maintenance_orders',
						id: args.id,
					}),
				},
			},
			keys: {
				tenants_aggregate: () => null,
				tenants_aggregate_fields: () => null,
				leases_aggregate: () => null,
				leases_aggregate_fields: () => null,
				units_aggregate: () => null,
				units_aggregate_fields: () => null,
				properties_aggregate: () => null,
				properties_aggregate_fields: () => null,
				clients_aggregate: () => null,
				clients_aggregate_fields: () => null,
				transactions_aggregate: () => null,
				transactions_aggregate_fields: () => null,
			},
		});

		const client = createClient({
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
				cacheConfig,
				// ssr,
				fetchExchange,
			],
		});

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
