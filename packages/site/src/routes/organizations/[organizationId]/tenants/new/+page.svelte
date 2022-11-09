<script lang="ts">
	import Form2 from '$lib/components/form/Form2.svelte';
	import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const formModel = tenantFormModel();
</script>

<Form2 {formModel} {form} />
