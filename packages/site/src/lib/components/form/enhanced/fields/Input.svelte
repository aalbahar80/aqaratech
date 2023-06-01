<script lang="ts">
	import clsx from 'clsx';

	import type { FormField } from '$lib/components/form/model/form-field.interface';

	import L from '$i18n/i18n-svelte';
	import FieldLabel from '$lib/components/form/enhanced/fields/FieldLabel.svelte';

	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;

	const parse = (value: unknown) => {
		if (formField.type === 'date' && typeof value === 'string') {
			// format ISO date string to short format YYYY-MM-DD
			return value.substring(0, 10);
		} else {
			return value ?? '';
		}
	};
</script>

<FieldLabel {formField} />

<div class="mt-1">
	{#if formField.type === 'file'}
		<label
			for={formField.name}
			class="inline-flex cursor-pointer rounded bg-gray-500 px-5 py-1 text-white"
		>
			{$L.buttons.fileInput()}
		</label>
	{/if}
	<svelte:element
		this={formField.type === 'textarea' ? 'textarea' : 'input'}
		type={formField.type === 'number' ? 'tel' : formField.type}
		name={formField.name}
		id={formField.name}
		value={parse(value)}
		class={clsx(
			'block w-full disabled:cursor-not-allowed disabled:text-slate-500 sm:text-sm',
			'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:shadow-none',
			formField.type === 'file' && 'hidden',
		)}
		placeholder={formField.placeholder}
		aria-describedby={formField.hintId}
		class:invalid={errors}
	/>
</div>

<style lang="postcss">
	.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
