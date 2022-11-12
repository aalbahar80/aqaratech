<script lang="ts">
	interface ActionButtonProps {
		label: string;
		onClick: () => void;
		disabled: boolean;
	}

	export let options: ActionButtonProps;
</script>

<td class="relative text-right text-sm font-medium">
	<button
		type="button"
		class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
		on:click={options.onClick}
		disabled={options.disabled}
	>
		{options.label}
	</button>
</td>
