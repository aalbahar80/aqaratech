/* eslint-disable import/prefer-default-export */
import type { RequestHandler } from '@sveltejs/kit';
import { operationStore, query } from '@urql/svelte';
import { TenantBreadcrumbsDocument } from './tenants/_[id].gql';
// import client from '../_client';

export const get: RequestHandler = () => {
	// console.log('try get')
	// console.log(crumbs)
	return {
		body: 1,
		status: 200,
	};
};

export const ep2 = () => operationStore(TenantBreadcrumbsDocument, { id: 3 });
