<script lang="ts">
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';
	import { writable } from 'svelte/store';
	import type { ActionData } from './$types';

	type T = $$Generic;
	type Errors = NonNullable<ActionData>['errors'] | undefined;

	export let form: ActionData;
	export let formModel: FormModel<T>;

	const errors = writable<Errors>(form?.errors);
</script>

<form
	method="POST"
	class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
>
	<Fields>
		{#each objectValues(formModel.fields) as formField}
			<Field {formField} value={form?.fullName} {errors} />
		{/each}

		<pre>{JSON.stringify(form, null, 2)}</pre>
	</Fields>
	<!-- nationality -->
	<!-- <select name="nationality" value={form?.nationality ?? ''}>
		{#each countries as country}
			<option value={country.alpha3Code}>{country.name}</option>
		{/each}

	</select> -->

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<button>Save</button>
	</div>
</form>
