<!-- <script lang="ts">
	import {
		initClient,
		dedupExchange,
		ssrExchange,
		fetchExchange
	} from '@urql/svelte';
	import { devtoolsExchange } from '@urql/devtools';
	import schema from './graphql.schema.json';
	import type { IntrospectionQuery } from 'graphql';
	import { cacheExchange } from '@urql/exchange-graphcache';
	import { simplePagination } from '@urql/exchange-graphcache/extras';
	import { onDestroy } from 'svelte';

	const isServerSide = typeof window === 'undefined';

	// The `ssrExchange` must be initialized with `isClient` and `initialState`
	const ssr = ssrExchange({
		isClient: !isServerSide,
		initialState: !isServerSide ? window['__URQL_DATA__'] : undefined
	});

	const cache = cacheExchange({
		schema: schema as unknown as IntrospectionQuery,
		resolvers: {
			Query: {
				tenants: simplePagination({ offsetArgument: 'offset' })
			}
		}
	});

	initClient({
		url: 'https://nov22test.hasura.app/v1/graphql',
		fetchOptions: {
			headers: {
				'x-hasura-admin-secret':
					'WvSsTe4GMxin4Z8DCuyAoLNNNFiXFw3JMWzUJG62TiJ02kFGhLOfuiR7DJWy2FQd'
			}
		},
		exchanges: [devtoolsExchange, dedupExchange, cache, ssr, fetchExchange]
		// maskTypename: true,
		// requestPolicy: 'cache-and-network'
	});

	onDestroy(() => {
		// if (!isServerSide) {
		// 	window['__URQL_DATA__'] = cache.extract();
		// }
		console.log('destroyed');
	});
</script>

<div>
	<slot />
</div> -->
