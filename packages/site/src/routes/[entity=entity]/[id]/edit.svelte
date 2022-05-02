<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Entity } from '$models/interfaces/entity.interface';
	import { classMap } from '../../../lib/models/classes/all.class';
	import type { Load } from './edit';

	type Params = Parameters<Load>['0']['params'];
	export const load: Load = async ({ params }) => {
		const id = params.id;
		const entity = params.entity as Entity;
		const data = await trpc.query(`${entity}:basic`, id);
		return {
			props: { data },
		};
	};
</script>

<script lang="ts">
	export let data: InferQueryOutput<`${typeof cstor.urlName}:basic`>;
	const entity = $page.params.entity as Entity;
	const cstor = classMap[entity];
</script>

<svelte:head>
	<title>{`Edit ${cstor.singularCap}`}</title>
</svelte:head>

<Form {data} {cstor} />
