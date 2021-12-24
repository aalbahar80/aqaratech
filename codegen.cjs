module.exports = {
	schema: [
		{
			'https://nov22test.hasura.app/v1/graphql': {
				// 'https://nov22test.hasura.app/v1beta1/relay': {
				headers: {
					// Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
					'x-hasura-admin-secret':
						'WvSsTe4GMxin4Z8DCuyAoLNNNFiXFw3JMWzUJG62TiJ02kFGhLOfuiR7DJWy2FQd',
				},
			},
		},
	],
	documents: ['./src/**/*.graphql', './src/**/*.ts', './src/**/*.svelte'],
	overwrite: true,
	generates: {
		'./src/generated/graphql.ts': {
			plugins: [
				{ add: { content: '/* eslint-disable */' } },

				'typescript',
				'typescript-operations',
				// 'typescript-urql', // replaced with typed-document-node, make life easier
				'urql-svelte-operations-store',
				// https://github.com/FormidableLabs/urql/issues/901
				'typescript-urql-graphcache',
				'typed-document-node',
			],
			config: {
				useTypeImports: true,
				// skipTypename: false,
				withHooks: false,
				// withHOC: false,
				// withComponent: false,
				namingConvention: 'keep',
			},
		},
		// OG introspection
		'./src/graphql.schema.json': {
			plugins: ['introspection'],
		},
		// not sure what's different than OG
		// it doesn't seem to minify...?
		// https://github.com/dotansimha/graphql-code-generator/blob/master/packages/plugins/other/urql-introspection/src/index.ts
		'./src/NEWgraphql.schema.json': {
			plugins: ['urql-introspection'],
		},
		'./src': {
			preset: 'near-operation-file',
			presetConfig: {
				baseTypesPath: './generated/graphql',
				extension: '.gql.ts',
			},
			plugins: [
				{ add: { content: '/* eslint-disable */' } },
				'typescript-operations',
				'typed-document-node',
			],
			config: {
				flattenGeneratedTypes: true,
				useTypeImports: true,
				useTypeImports: true,
				enumsAsTypes: true,

				omitOperationSuffix: true,
				dedupeOperationSuffix: true,
				exportFragmentSpreadSubTypes: true,
				experimentalFragmentVariables: true,
				addUnderscoreToArgsType: true,

				// onlyOperationTypes: true,
				preResolveTypes: true,

				namingConvention: 'keep',

				// scalars:
				//   UnsignedInt: number
				//   URL: string
				//   JSON: any # string | number | boolean | null | Array<Scalars['JSON']> | Scalars['JSONObject']
				//   JSONObject: Record<string, any>
				//   Date: string
				//   DateTime: string
			},
		},
	},
	hooks: {
		afterAllFileWrite: ['prettier --write'],
	},
};
