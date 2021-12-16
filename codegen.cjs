module.exports = {
	schema: [
		{
			'https://nov22test.hasura.app/v1/graphql': {
				// 'https://nov22test.hasura.app/v1beta1/relay': {
				headers: {
					// Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
					'x-hasura-admin-secret':
						'WvSsTe4GMxin4Z8DCuyAoLNNNFiXFw3JMWzUJG62TiJ02kFGhLOfuiR7DJWy2FQd'
				}
			}
		}
	],
	documents: ['./src/**/*.graphql', './src/**/*.ts'],
	overwrite: true,
	generates: {
		'./src/generated/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-urql',
				'urql-svelte-operations-store',
				// https://github.com/FormidableLabs/urql/issues/901
				'typescript-urql-graphcache'
			],
			config: {
				useTypeImports: true,
				// skipTypename: false,
				withHooks: false
				// withHOC: false,
				// withComponent: false,
			}
		},
		// OG introspection
		'./src/graphql.schema.json': {
			plugins: ['introspection']
		},
		// not sure what's different than OG
		// it doesn't seem to minify...?
		// https://github.com/dotansimha/graphql-code-generator/blob/master/packages/plugins/other/urql-introspection/src/index.ts
		'./src/NEWgraphql.schema.json': {
			plugins: ['urql-introspection']
		}
	}
};
