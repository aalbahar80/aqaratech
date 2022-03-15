<script lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import { singular } from '$lib/definitions/index';

	const entity = 'leases';
</script>

<svelte:head>
	<title>{`New ${singular[entity]}`}</title>
</svelte:head>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="min-w-0 flex-1">
		<h2
			class="pb-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:pb-6 sm:text-3xl"
		>
			New Lease
		</h2>
	</div>
	<LeaseForm />
</div>
