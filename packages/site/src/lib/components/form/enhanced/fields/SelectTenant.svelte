<script lang="ts">
	import { createApi } from '$api';
	import ComboboxField from '$lib/components/form/enhanced/fields/ComboboxField.svelte';
	import { tenantsToOptions } from '$lib/components/form/inputs/to-options';

	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';
	import type { Option } from '$lib/models/interfaces/option.interface';

	import { onMount } from 'svelte';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;

	let options: Option[] = [];

	const api = createApi();

	const searchTenants = async (query: string) => {
		const tenants = await api.tenants.findAll({
			filter: { fullName: { contains: query, mode: 'insensitive' } },
			take: 50,
		});

		options = tenantsToOptions(tenants);

		if ('options' in formField) {
			formField.options = options;
		} else {
			// formField.getOptions = () => options;
			throw new Error('Not implemented');
		}
	};

	onMount(async () => {
		await searchTenants('');
	});
</script>

<ComboboxField
	{formField}
	{value}
	{errors}
	on:filter={async (e) => {
		await searchTenants(e.detail);
	}}
/>
