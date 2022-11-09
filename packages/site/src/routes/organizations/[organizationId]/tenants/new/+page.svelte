<script lang="ts">
	import Form2 from '$lib/components/form/Form2.svelte';
	import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';
	import { writable } from 'svelte/store';
	import type { ActionData } from './$types';

	type Errors = NonNullable<ActionData>['errors'] | undefined;

	export let form: ActionData;

	const formModel = tenantFormModel();
	const errors = writable<Errors>(form?.errors);
</script>

<pre>{JSON.stringify({ form, errors }, null, 2)}</pre>

<Form2 {formModel} {form} />
