import { getIntrospectionQuery } from 'graphql';
import fetch from 'node-fetch'; // or your preferred request in Node.js
import * as fs from 'fs';

import {
	getIntrospectedSchema,
	minifyIntrospectionQuery
} from '@urql/introspection';

fetch('https://nov22test.hasura.app/v1/graphql', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'x-hasura-admin-secret':
			'WvSsTe4GMxin4Z8DCuyAoLNNNFiXFw3JMWzUJG62TiJ02kFGhLOfuiR7DJWy2FQd'
	},
	body: JSON.stringify({
		variables: {},
		query: getIntrospectionQuery({ descriptions: false })
	})
})
	.then((result) => result.json())
	.then(({ data }) => {
		const minified = minifyIntrospectionQuery(getIntrospectedSchema(data));
		fs.writeFileSync('./src/FROMSCRIPTschema.json', JSON.stringify(minified));
	});
