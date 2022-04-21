<script lang="ts">
	import { areas } from '$lib/config/constants';
	import Fuse from 'fuse.js';
	import Select from 'svelte-select';

	export let invalidText: string | undefined = undefined;
	// export let value: string | undefined = undefined;
	export let value: any = undefined;
	export let id: string = '';
	console.log({ value }, 'SelectArea.svelte ~ 10');

	const config = {
		includeScore: true,
		keys: ['0', '1'],
	};

	const options = areas.map((area) => ({
		value: area[1],
		label: `${area[0]} | ${area[1]}`,
	}));
	const fuse = new Fuse(areas, config);
	const loadOptions = async (q: string = '') =>
		fuse.search(q).map((result) => ({
			value: result.item[1],
			label: `${result.item[0]} | ${result.item[1]}`,
		}));

	function formNone(node: HTMLElement) {
		// Remove's tailwind from class
		const input = node.querySelector('input');
		if (input) {
			input.removeAttribute('type');
		}
	}
</script>

<div use:formNone>
	<Select
		{id}
		items={options}
		hasError={Boolean(invalidText)}
		{value}
		{loadOptions}
		placeholder="Type to search in English or Arabic..."
		on:select
		on:clear
	/>
</div>
