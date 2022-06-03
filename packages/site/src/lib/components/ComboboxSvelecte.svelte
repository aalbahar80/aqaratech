<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';
	import { formNone } from '$lib/utils/form-none';
	import Svelecte from 'svelecte';

	type $$Events = {
		change: {
			detail?: SelectedOption;
		};
	};

	export let options: Option[];
	/** The current selection. Bindable. */
	export let selection: SelectedOption = undefined;
	/** The initial/current value. Bindable. */
	export let value: Option['value'] = undefined;
	export let placeholder: string = 'Type to search';
	export let name: string | undefined = undefined;
	export let disabled = false;
</script>

<div use:formNone>
	<Svelecte
		{options}
		{name}
		bind:readSelection={selection}
		bind:value
		{placeholder}
		on:change
		{disabled}
	/>
</div>
