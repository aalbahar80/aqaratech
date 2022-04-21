<script lang="ts">
	import Svelecte from 'svelecte';
	import { createEventDispatcher } from 'svelte';

	interface Option {
		value: string;
		text: string;
	}

	const dispatch = createEventDispatcher<{
		change: Option;
	}>();

	/** Set with `for` to link to input. */
	export let label: string | undefined = undefined;

	/** Set with `label` to populate `for` attribute. */
	export let id: string | undefined = undefined;

	/** Can also be bound to. Format: `{ value: 'germany', text: 'Germany'}` */
	export let selection: Option | null = null;

	export let options: Option[] = [];

	/** Initial value. Can also be bound to. */
	export let value = 'expired';

	// const options = [
	// 	{ value: 'current', text: 'Current' },
	// 	{ value: 'expired', text: 'Expired' },
	// 	{ value: 'upcoming', text: 'Upcoming' },
	// ];

	const debug = true;

	function formNone(node: HTMLElement) {
		// Remove's tailwind from class
		const input = node.querySelector('input');
		if (input) {
			input.removeAttribute('type');
		}
	}
</script>

{#if label}
	<label for={id} class="block text-sm font-medium text-gray-700">
		{label}
	</label>
{/if}

<div use:formNone>
	<Svelecte
		inputId={id}
		{options}
		bind:value
		bind:readSelection={selection}
		placeholder="Select country"
		fetchCallback={(data) => {
			console.log(data);
		}}
		on:change
	/>
</div>

{#if debug}
	<div class="prose py-6">
		<pre>{JSON.stringify(selection, null, 2)}</pre>
		<pre>{JSON.stringify(value, null, 2)}</pre>
	</div>
{/if}
