import {
	createClient,
	initClient,
	dedupExchange,
	ssrExchange,
	fetchExchange
} from '@urql/svelte';
import { devtoolsExchange } from '@urql/devtools';
import rawSchema from './FROMSCRIPTschema.json';
import { cacheExchange } from '@urql/exchange-graphcache';
import type { GraphCacheConfig } from '$generated/graphql';

const mySchema = rawSchema;

const cache = cacheExchange<GraphCacheConfig>({
	schema: mySchema,
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
			}
		}
	}
});

export default createClient({
	url: 'https://nov22test.hasura.app/v1/graphql',
	fetchOptions: {
		headers: {
			'x-hasura-admin-secret':
				'WvSsTe4GMxin4Z8DCuyAoLNNNFiXFw3JMWzUJG62TiJ02kFGhLOfuiR7DJWy2FQd'
		}
	},
	exchanges: [
		// devtoolsExchange,
		dedupExchange,
		cache,
		//ssr,
		fetchExchange
	]
	// maskTypename: true,
	// requestPolicy: 'cache-and-network'
});

// const isServerSide = typeof window === 'undefined';

// The `ssrExchange` must be initialized with `isClient` and `initialState`
// const ssr = ssrExchange({
// 	isClient: !isServerSide,
// 	initialState: !isServerSide ? window['__URQL_DATA__'] : undefined
// });

// export const data = `
// <script lang="ts">
//   window.__URQL_DATA__ = JSON.parse(JSON.stringify(__SSR__));
// </script>
// `;
