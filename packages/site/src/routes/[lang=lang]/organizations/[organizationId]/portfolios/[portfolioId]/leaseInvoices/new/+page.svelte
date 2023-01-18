<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	import { getMultipleUrl } from '../new-multiple/get-multiple-url';

	import L from '$i18n/i18n-svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';

	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'leaseInvoice',
	});
</script>

<TextButton>
	<a href={getMultipleUrl($page.url).toString()}>
		{$L.buttons.addMultiple()}
		<Arrow />
	</a>
</TextButton>
<EnhancedForm {formModel} {form} />
