<script lang="ts">
	import { classes } from '$lib/utils';
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
	} from '@rgossiaux/svelte-headlessui';
	import { CheckCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';

	type T = $$Generic;
	interface RadioOption {
		fieldName: T;
		value: string | null | undefined;
		title?: string;
		label?: string | undefined;
		footer?: string;
	}
	type SelectedRadioOption = RadioOption | undefined;
	export let options: RadioOption[];

	let selected: SelectedRadioOption;

	const dispatch = createEventDispatcher<{
		select: RadioOption[];
	}>();

	/** Clear radio then dispatch `change` event. */
	export const clear = () => {
		handleChange(undefined);
	};

	const handleChange = (updated: SelectedRadioOption) => {
		selected = updated;
		const result = options.map((option) => ({
			label: option.label,
			value: updated?.value === option.value ? option.value : null,
			fieldName: option.fieldName,
		}));
		console.log({ result }, 'RadioEntity.svelte ~ 52');
		dispatch('select', result);
	};

	const optionClass = (
		checked: boolean,
		active: boolean,
		disabled: boolean,
	): string => {
		return classes(
			checked ? 'border-transparent' : 'border-gray-300',
			active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
			disabled
				? 'cursor-not-allowed opacity-25'
				: 'cursor-pointer focus:outline-none',
			'relative flex rounded-lg border bg-white p-4 shadow-sm',
		);
	};
</script>

<RadioGroup value={selected} on:change={(e) => handleChange(e.detail)}>
	<!-- <RadioGroupLabel class="text-base font-medium text-gray-900"
		>Select a mailing list
	</RadioGroupLabel> -->

	<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
		{#each options as option (option.title)}
			<RadioGroupOption
				value={option}
				disabled={!option.value}
				class={({ checked, active, disabled }) =>
					optionClass(checked, active, disabled)}
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
						{#if option.label}
							<RadioGroupDescription
								as="span"
								class="mt-1 flex items-center text-sm text-gray-500"
							>
								{option.label}
							</RadioGroupDescription>
						{/if}
						{#if option.footer}
							<RadioGroupDescription
								as="span"
								class="mt-6 text-sm font-medium text-gray-900"
							>
								{option.footer}
							</RadioGroupDescription>
						{/if}
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
