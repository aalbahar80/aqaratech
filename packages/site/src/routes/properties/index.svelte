<script context="module" lang="ts">
	import trpc from '$lib/client/trpc';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import type { Props } from '$models/types/Props.type';
	import type { LoadInput } from '@sveltejs/kit';

	export const load = async ({ session }: LoadInput) => {
		const { data: properties, pagination } = session.authz?.isAdmin
			? await trpc.query('properties:list', {})
			: await trpc.query('owner:properties:list', {
					clientId: session.authz?.id,
			  });

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
