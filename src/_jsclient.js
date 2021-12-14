// @ts-nocheck
import {
	createClient,
	initClient,
	dedupExchange,
	ssrExchange,
	fetchExchange
} from '@urql/svelte';
import { devtoolsExchange } from '@urql/devtools';
// import rawSchema from './NEWgraphql.schema.json';
import rawSchema from './FROMSCRIPTschema.json';

import { cacheExchange } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';

const isServerSide = typeof window === 'undefined';

// The `ssrExchange` must be initialized with `isClient` and `initialState`
// const ssr = ssrExchange({
// 	isClient: !isServerSide,
// 	initialState: !isServerSide ? window['__URQL_DATA__'] : undefined
// });
// const schema = rawSchema as unknown as IntrospectionData;

const cache = cacheExchange({ rawSchema });
// const cache = cacheExchange();

// const cache = cacheExchange({
// 	schema: rawSchema as unknown as IntrospectionQuery,
// 	resolvers: {
// 		Query: {
// 			tenants: simplePagination({ offsetArgument: 'offset' })
// 		}
// 	}
// });

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

// export const data = `
// <script lang="ts">
//   window.__URQL_DATA__ = JSON.parse(JSON.stringify(__SSR__));
// </script>
// `;
