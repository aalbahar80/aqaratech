<script lang="ts">
	import { onMount } from 'svelte';

	type Option = { value: string; label: string };

	// TODO add required asterisk
	export let label: string;
	export let name: string;
	export let getOptions: () => Promise<Option[]>;
	export let value = '';
	export let error: string | void;

	let options: Option[] = [];
	let loading = false;

	const load = async () => {
		loading = true;
		options = await getOptions();
		loading = false;
	};

	onMount(load);
	$: console.log(value, 'value inner select');
</script>

<label aria-busy={loading}>
	{name}
	<!-- bind:value -->
	<select
		{value}
		{name}
		id={name}
		on:focus={load}
		aria-invalid={error ? 'true' : undefined}
	>
		{#if value}
			<option {value}>{label}</option>
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
