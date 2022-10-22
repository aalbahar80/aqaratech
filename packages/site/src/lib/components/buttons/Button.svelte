<script lang="ts">
	import Spinner from '$components/Spinner.svelte';
	import type { IconSource } from '@steeze-ui/heroicons/types';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let loading = false;
	export let disabled = false;
	export let text = '';
	export let icon: IconSource | undefined = undefined;
	export let solid = false;
	export let as: 'button' | 'a' | 'div' = 'button';
	export let href = '';
	export let prefetch: true | undefined = undefined;
</script>

<!-- TODO add back prefetch attribute after optimization -->
<svelte:element
	this={disabled ? 'button' : as}
	id="sbutton"
	class={$$props.class}
	{href}
	type="submit"
	{disabled}
	on:click
>
	<div class="-ml-1 mr-2 hidden h-5 w-5 sm:block">
		<Spinner {loading} />
		<slot>
			{#if icon && !loading}
				<Icon
					src={icon}
					theme={solid ? 'solid' : 'default'}
					aria-hidden="true"
				/>
			{/if}
		</slot>
	</div>
	{text}
</svelte:element>

<style lang="postcss">
	#sbutton {
		@apply inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm;
		min-width: var(--min-width);
		min-height: var(--min-height);
		/* border-bottom-right-radius: var(--border-radius-b, 0.375rem); */
		-webkit-appearance: none;
	}
	#sbutton:disabled {
		@apply cursor-not-allowed opacity-50;
	}
	#sbutton:hover {
		@apply bg-indigo-700;
	}
	#sbutton:focus {
		@apply outline-none ring-2 ring-indigo-500 ring-offset-2;
	}
</style>
