<script lang="ts">
	import { DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import TWInput from './TWInput.svelte';

	let isOpen = true;
	const close = () => {
		isOpen = false;
	};

	const open = () => {
		isOpen = true;
	};
	export let formData: Record<string, any>;
</script>

<form
	action="/tenant"
	method="post"
	class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
>
	<div class="h-0 flex-1 overflow-y-auto">
		<div class="bg-indigo-700 py-6 px-4 sm:px-6">
			<div class="flex items-center justify-between">
				<DialogTitle class="text-lg font-medium text-white"
					>New Tenant</DialogTitle
				>
				<div class="ml-3 flex h-7 items-center">
					<button
						type="button"
						class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
						on:click={close}
					>
						<span class="sr-only">Close panel</span>
						<Icon src={X} class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col justify-between">
			<div class="divide-y divide-gray-200 px-4 sm:px-6">
				<div class="space-y-6 pt-6 pb-5">
					{#each Object.entries(formData) as [name, value]}
						<!-- content here -->
						<TWInput {name} {value} />
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-shrink-0 justify-end px-4 py-4">
		<button
			type="button"
			class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			on:click={close}
		>
			Cancel
		</button>
		<button
			type="submit"
			class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			Save
		</button>
	</div>
</form>
