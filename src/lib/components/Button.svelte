<script lang="ts">
	import Spinner from '$components/Spinner.svelte';
	import type { IconSource } from '@steeze-ui/heroicons/types';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let text: string = '';
	export let icon: IconSource | undefined = undefined;
</script>

<button type="submit" {disabled} class={$$props.class} on:click>
	<Spinner {loading} />
	{#if icon}
		<Icon
			src={icon}
			theme="solid"
			class="-ml-1 mr-2 h-5 w-5"
			aria-hidden="true"
		/>
	{/if}
	{text}
</button>

<style lang="postcss">
	button {
		@apply inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm;
	}
	button:disabled {
		@apply cursor-not-allowed opacity-50;
	}
	button:hover {
		@apply bg-indigo-700;
	}
	button:focus {
		@apply outline-none ring-2 ring-indigo-500 ring-offset-2;
	}
</style>
