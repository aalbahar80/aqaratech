<script lang="ts">
	import type { TenantDto } from '$api/openapi';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';

	export let data: TenantDto | undefined = undefined;

	const form = tenantFormModel();
</script>

<Form2 {form} />
