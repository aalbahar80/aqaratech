<script context="module" lang="ts">
	import { trpc } from '$lib/client/trpc';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import type { Props } from '$models/types/Props.type';
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ session, fetch }: LoadEvent) => {
		const { data: properties } = session.authz?.isOwner
			? await trpc(fetch).query('owner:properties:list', {
					clientId: session.authz?.id,
			  })
			: await trpc(fetch).query('properties:list', {});

		return {
			props: { properties },
		};
	};
</script>

<script lang="ts">
	type Properties = Props<typeof load>['properties'];
	export let properties: Properties;
</script>

<PropertyList {properties} />
