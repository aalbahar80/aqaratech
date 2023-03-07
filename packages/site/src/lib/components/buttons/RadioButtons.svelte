<script lang="ts">
	import {
		RadioGroup,
		RadioGroupLabel,
		RadioGroupOption,
	} from '@rgossiaux/svelte-headlessui';

	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';

	import { classes } from '$lib/utils/classes';

	export let options: Option[];
	export let selected: SelectedOption = undefined;
</script>

<div>
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-gray-900">Sort By</h2>
	</div>

	<RadioGroup
		value={selected}
		on:change={(val) => {
			selected = val.detail;
		}}
		class="mt-2"
	>
		<RadioGroupLabel class="sr-only">Choose a field to sort by</RadioGroupLabel>
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
			{#each options as option (option.value)}
				<RadioGroupOption
					value={option}
					disabled={option.disabled}
					let:active
					let:checked
				>
					<slot
						{active}
						{checked}
						{option}
					>
						<div
							class={classes(
								!option.disabled
									? 'cursor-pointer focus:outline-none'
									: 'cursor-not-allowed opacity-25',
								active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
								checked
									? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
									: 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
								'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
							)}
						>
							<RadioGroupLabel as="span">{option.label}</RadioGroupLabel>
						</div>
					</slot>
				</RadioGroupOption>
			{/each}
		</div>
	</RadioGroup>
</div>
