<script lang="ts">
	type Option = {
		label: string;
		value: string;
		disabled?: boolean;
		selected?: boolean;
	};

	export let title: string;
	export let options: Option[];
</script>

<label for="group-by" class="block text-sm font-medium text-gray-700">
	{title}
</label>
<select
	id="group-by"
	name="group-by"
	class="mt-1 block w-1/5 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
	on:change
>
	{#each options as { label, value, selected, disabled }}
		<option {selected} {value} {disabled}>{label}</option>
	{/each}
</select>
