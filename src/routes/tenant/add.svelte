<script lang="ts">
	import FormTrpc from '$components/form/FormTrpc.svelte';
	import type { InferMutationInput } from '$lib/client/trpc';

	type Tenant = InferMutationInput<'tenants:save'>;
	const newTenant = (): Tenant => ({
		id: '',
		firstName: 'Kylian',
		lastName: 'Mbappe',
		email: '',
		civilid: '',
		phone: '12345678',
	});
</script>

<FormTrpc formData={newTenant()} />
