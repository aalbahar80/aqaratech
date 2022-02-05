<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import {
		fieldList,
		validation,
		graphqlName,
	} from '$lib/definitions/Transactions';
</script>

<FormCS
	{fieldList}
	insertDoc={AddTransactionDocument}
	entity={graphqlName}
	{validation}
/>
