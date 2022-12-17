<script lang="ts">
	import { page } from '$app/stores';

	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';

	import { getMultipleUrl } from '../new-multiple/get-multiple-url';

	import type { ActionData } from './$types';

	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'leaseInvoice',
	});
</script>

<TextButton>
	<a href={getMultipleUrl($page.url).toString()}>
		Add multiple invoices
		<span aria-hidden="true">→</span>
	</a>
</TextButton>
<EnhancedForm {formModel} {form} />
