<script lang="ts">
	import clsx from 'clsx';

	import type { SvelteComponent } from 'svelte';

	import type { LinkOptions } from '$lib/components/sidebar/types';

	type GenericActionCellProps =
		| {
				element: 'button';
				label: string;
				slot?: typeof SvelteComponent;
				cls?: string;
				onClick: () => void;
				disabled?: boolean;
		  }
		| {
				element: 'a';
				label: string;
				slot?: typeof SvelteComponent;
				cls?: string;
				href: string;
				disabled?: boolean;
				linkOptions?: LinkOptions | Partial<HTMLAnchorElement>;
		  };

	export let options: GenericActionCellProps;
	$: disabled = 'disabled' in options && options.disabled;
</script>

<div class="relative text-left text-sm font-medium">
	<svelte:element
		this={options.element ?? 'button'}
		href={'href' in options && !disabled ? options.href : undefined}
		on:click={'onClick' in options ? options.onClick : undefined}
		{disabled}
		class={options.cls ??
			clsx(
				'inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
				disabled && 'cursor-not-allowed opacity-30',
			)}
		{...'linkOptions' in options ? options.linkOptions : {}}
	>
		{#if options.slot}
			<svelte:component this={options.slot} />
		{/if}
		{options.label}
	</svelte:element>
</div>
