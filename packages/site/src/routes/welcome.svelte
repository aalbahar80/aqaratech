<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import MaterialSymbolsAddBusinessRounded from '~icons/material-symbols/add-business-rounded';
</script>

<div class="flex flex-col items-center pt-44">
	<h1
		class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
	>
		Welcome to Aqaratech
	</h1>
	<!-- <Button
		text="Create an organization"
		as="button"
		class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		on:click={() => {
			console.log('sample4.svelte ~ 63');
		}}
	>
		<MaterialSymbolsAddBusinessRounded class="" />
	</Button> -->

	<EmptyState
		entity="organizations"
		buttonText="Create an organization"
		formUrl="/organizations/new"
		message=""
	/>
	<small>
		<!-- <a
			href="#"
			class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
		>
			Expecting an invitation?
		</a> -->
	</small>
</div>
