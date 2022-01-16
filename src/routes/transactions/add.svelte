<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import {
		fieldList,
		validation,
		graphqlName,
	} from '$lib/definitions/Transactions';
	import { AddTransactionDocument } from './_add.gql';
</script>

<FormCS
	{fieldList}
	insertDoc={AddTransactionDocument}
	entity={graphqlName}
	{validation}
/>
