<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		const id = page.params.id;

		if (id === 'add') {
			return;
		} else {
			return;
		}
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import {
		TenantsByIdDocument,
		TenantsByIdQuery,
		TenantsByIdQueryVariables
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	const tenant = operationStore<TenantsByIdQuery, TenantsByIdQueryVariables>(
		TenantsByIdDocument,
		{
			id: parseInt($page.params.id)
		}
	);
	query(tenant);
</script>

{JSON.stringify($tenant)}
