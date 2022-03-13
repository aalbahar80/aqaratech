<script context="module" lang="ts">
	import Form from '$components/form/Form.svelte';
	import { entityDefinitions, singular } from '$lib/definitions/index';
	import type { Load } from './add';

	export const load: Load = ({ params, url }) => {
		const predefined = Object.fromEntries(url.searchParams.entries());
		return {
			props: { predefined },
		};
	};
</script>

<script lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import MultiForm from '$lib/components/lease/MultiForm.svelte';

	const entity = 'leases';
	export let predefined: Record<string, string>;

	const defaultForm = entityDefinitions[entity].defaultForm();
	const lease = {
		...defaultForm,
		...predefined,
	};
</script>

<svelte:head>
	<title>{`New ${singular[entity]}`}</title>
</svelte:head>

<!-- <Form {entity} {data} schema={entityDefinitions[entity].schema} /> -->

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="min-w-0 flex-1">
		<h2
			class="pb-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:pb-6 sm:text-3xl"
		>
			New Lease
		</h2>
	</div>
	<LeaseForm {lease} />
</div>

<!-- <div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<MultiForm />
</div> -->
