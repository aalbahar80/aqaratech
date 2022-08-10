<script lang="ts" context="module">
	import FileForm from '$lib/components/file/FileForm.svelte';
	import { CreateRelationKeyEnum } from '@self/sdk';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url }: LoadEvent) => {
		const relationKey = url.searchParams.get('relationKey');
		const relationValue = url.searchParams.get('relationValue');

		if (!relationKey || !relationValue) {
			throw new Error('Insufficient URL parameters');
		}

		const valid = Object.keys(CreateRelationKeyEnum).includes(relationKey);
		if (!valid) {
			throw new Error('Invalid URL parameters');
		}

		return {
			props: {
				relationKey: relationKey as CreateRelationKeyEnum,
				relationValue,
			},
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let relationKey: Prop['relationKey'];
	export let relationValue: Prop['relationValue'];
</script>

<FileForm {relationKey} {relationValue} />
