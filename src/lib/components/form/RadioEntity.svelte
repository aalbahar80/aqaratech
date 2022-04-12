<script lang="ts">
	import { classes } from '$lib/utils';
	import { CheckCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		RadioGroup,
	} from '@rgossiaux/svelte-headlessui';

	interface RadioOption {
		value: string;
		title: string;
		description?: string;
		footer?: string;
		disabled?: boolean;
	}
	export let options: RadioOption[];

	let value = options[0];
	console.log({ value }, 'RadioEntity.svelte ~ 22');
</script>

<RadioGroup {value} on:change={(e) => (value = e.detail)}>
	<RadioGroupLabel class="text-base font-medium text-gray-900"
		>Select a mailing list</RadioGroupLabel
	>

	<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
		{#each options as option (option.title)}
			<RadioGroupOption
				value={option.value}
				class={({ checked, active }) =>
					classes(
						checked ? 'border-transparent' : 'border-gray-300',
						active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
						'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
					)}
				let:checked
				let:active
			>
				<div class="flex flex-1">
					<div class="flex flex-col">
						<RadioGroupLabel
							as="span"
							class="block text-sm font-medium text-gray-900"
						>
							{option.title}
						</RadioGroupLabel>
						<RadioGroupDescription
							as="span"
							class="mt-1 flex items-center text-sm text-gray-500"
						>
							{option.description}
						</RadioGroupDescription>
						<RadioGroupDescription
							as="span"
							class="mt-6 text-sm font-medium text-gray-900"
						>
							{option.footer}
						</RadioGroupDescription>
					</div>
				</div>
				<Icon
					src={CheckCircle}
					theme="solid"
					class={classes(
						!checked ? 'invisible' : '',
						'h-5 w-5 text-indigo-600',
					)}
					aria-hidden="true"
				/>
				<div
					class={classes(
						active ? 'border' : 'border-2',
						checked ? 'border-indigo-500' : 'border-transparent',
						'pointer-events-none absolute -inset-px rounded-lg',
					)}
					aria-hidden="true"
				/>
			</RadioGroupOption>
		{/each}
	</div>
</RadioGroup>
