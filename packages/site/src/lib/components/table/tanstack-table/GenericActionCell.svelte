<script lang="ts">
	import clsx from 'clsx';

	type GenericActionCellProps =
		| {
				element: 'button';
				label: string;
				onClick: () => void;
				disabled?: boolean;
		  }
		| {
				element: 'a';
				label: string;
				href: string;
				disabled?: boolean;
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
		class={clsx(
			'inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
			disabled && 'cursor-not-allowed opacity-30',
		)}
	>
		{options.label}
	</svelte:element>
</div>
