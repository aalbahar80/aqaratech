/* eslint-disable @typescript-eslint/naming-convention */
import type { GraphCacheConfig } from '$generated/graphql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { createClient, dedupExchange, fetchExchange } from '@urql/svelte';
import type { IntrospectionQuery } from 'graphql';
import rawSchema from '../../urql-graphql.schema.json';

const cacheConfig = cacheExchange<GraphCacheConfig>({
	schema: rawSchema as unknown as IntrospectionQuery,
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

export const urqlClient = (fetch: any) =>
	createClient({
		// Pass in the fetch from sveltekit to have access to serialized requests during hydration
		fetch,
		// dev: browser && dev
		url: '/api/graphql',
		exchanges: [
			// devtoolsExchange,
			dedupExchange,
			cacheConfig,
			// ssr,
			fetchExchange,
		],
	});
