<script lang="ts">
	import { onMount } from 'svelte';

	type Option = { value: string; label: string };

	// TODO add required asterisk
	export let optionLabel: string;
	export let name: string;
	export let getOptions: (query?: string) => Promise<Option[]>;
	export let value = '';
	export let error: string | void;

	let options: Option[] = [];
	let loading = false;

	const load = async (query = '') => {
		loading = true;
		options = await getOptions(query);
		loading = false;
	};

	onMount(load);
	$: console.log(value, 'value inner select');
</script>

<input type="text" on:input={(e) => load(e.currentTarget.value)} />
<label aria-busy={loading}>
	{name}
	<select {value} {name} id={name} aria-invalid={error ? 'true' : undefined}>
		{#if value}
			<option {value}>{optionLabel}</option>
		{:else}
			<option value="">Select...</option>
		{/if}
		{#each options as { value, label } (value)}
			<option {value}>{label}</option>
		{/each}
	</select>
	{#if error}
		<small>{error}</small>
	{/if}
</label>

<style>
	small {
		color: var(--form-element-invalid-active-border-color);
	}
</style>
