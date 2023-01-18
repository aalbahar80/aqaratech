<script lang="ts">
	import {
		Switch,
		SwitchDescription,
		SwitchGroup,
		SwitchLabel,
	} from '@rgossiaux/svelte-headlessui';

	import type { FormField } from '$lib/components/form/model/form-field.interface';

	import Tooltip from '$lib/components/Tooltip.svelte';
	import { classes } from '$lib/utils/classes';

	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
</script>

<!-- <input type=checkbox /> is not consistent with other HTML inputs -->
<!-- Read: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#attr-value -->

<SwitchGroup class="flex items-center justify-between">
	<span class="flex flex-grow flex-col">
		<SwitchLabel
			as="span"
			class="flex items-center gap-2 text-sm font-medium text-gray-700"
			passive
		>
			{formField.label}
			{#if formField.hint}
				<div class="mr-1.5">
					<Tooltip text={formField.hint} />
				</div>
			{/if}
		</SwitchLabel>
		<SwitchDescription as="span" class="text-sm text-gray-500">
			{formField.description}
		</SwitchDescription>
	</span>
	<Switch
		let:checked
		checked={!!value}
		on:change={(e) => {
			value = e.detail;
			// dispatch('select', { value: e.detail });
		}}
		class={classes(
			value ? 'bg-indigo-600' : 'bg-gray-200',
			'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
		)}
	>
		<pre>{JSON.stringify({ checked }, null, 2)}</pre>
		<span
			aria-hidden="true"
			class={classes(
				checked ? 'translate-x-5' : 'translate-x-0',
				'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
			)}
		/>
	</Switch>
</SwitchGroup>

<!-- hidden input to make checkbox compatible with enhanced form -->
<input
	type="hidden"
	name={formField.name}
	value={value === true ? 'on' : undefined}
	checked={value === true}
/>

<pre>{JSON.stringify({ value }, null, 2)}</pre>
