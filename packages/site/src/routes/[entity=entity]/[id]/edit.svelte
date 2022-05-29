<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import { trpc } from '$lib/client/trpc';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { classMap } from '$models/classes/all.class';
	import type { Load } from './__types/edit';

	export const load: Load = async ({ params, fetch }) => {
		const id = params.id;
		const entity = params.entity as EntityTitle;
		const data = await trpc(fetch).query(`${entity}:basic`, id);
		return {
			props: { data },
		};
	};
</script>

<script lang="ts">
	export let data: any;
	const entityName = $page.params.entity as EntityTitle;
	const entity = new classMap[entityName](data);
</script>

<Form {entity} />
