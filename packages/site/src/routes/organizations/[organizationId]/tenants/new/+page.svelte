<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const formModel = tenantFormModel();
</script>

<EnhancedForm {formModel} {form} />
