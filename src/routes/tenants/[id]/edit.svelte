<script lang="ts" context="module">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, graphqlName, validation } from '$lib/definitions/Tenants';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const tenant = await stuff.query(TenantEditScreenDocument, {
			id,
		});

		// eslint-disable-next-line consistent-return
		return {
			props: {
				tenant,
			},
		};
	};
</script>

<script lang="ts">
	export let tenant: TenantEditScreenStore;
	const existing: TenantEditScreen['tenants_by_pk'] =
		$tenant.data?.tenants_by_pk;
</script>

{#if existing}
	<FormCS
		{fieldList}
		updateDoc={TenantsUpdateDocument}
		entity={graphqlName}
		{existing}
		{validation}
	/>
{:else}
	TODO: Error state
{/if}
