<script lang="ts">
	import type { Icon } from '$lib/models/types/icon.type';

	import Spinner from '$components/Spinner.svelte';

	export let loading = false;
	export let disabled = false;
	export let text = '';
	export let icon: Icon | undefined = undefined;
	export let as: 'button' | 'a' | 'div' = 'button';
	export let href = '';
</script>

<!-- TODO add back prefetch attribute after optimization -->
<!-- eslint-disable @typescript-eslint/dot-notation -->
<svelte:element
	this={disabled ? 'button' : as}
	id="sbutton"
	class={$$props['class']}
	{href}
	type="submit"
	{disabled}
	on:click
>
	<div class="hidden h-5 w-5 ltr:mr-2 rtl:ml-2 sm:block">
		<Spinner {loading} />
		<slot>
			{#if icon && !loading}
				<svelte:component
					this={icon}
					aria-hidden="true"
				/>
			{/if}
		</slot>
	</div>
	{text}
</svelte:element>

<style lang="postcss">
	#sbutton {
		@apply inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm;
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
