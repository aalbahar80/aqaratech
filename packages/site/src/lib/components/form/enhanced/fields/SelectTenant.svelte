<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';

	import ComboboxField from '$lib/components/form/enhanced/fields/ComboboxField.svelte';
	import { searchTenants } from '$lib/components/tenant/get-tenants';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;

	let q = '';

	$: query = createQuery({
		queryFn: async () => await searchTenants(q),
		queryKey: ['tenants', q],
		enabled: !!q,
	});

	$: formField.options = $query.data ?? [];
</script>

<ComboboxField
	{formField}
	{value}
	{errors}
	on:filter={(e) => {
		q = e.detail;
	}}
/>
