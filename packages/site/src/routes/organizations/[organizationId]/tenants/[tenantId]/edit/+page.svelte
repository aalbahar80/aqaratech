<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const formModel = tenantFormModel();
</script>

<EnhancedForm {form} {formModel} data={data.tenant} />
