<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Clients';
	import { AddClientDocument } from './_add.gql';
</script>

<FormCS
	{fieldList}
	insertDoc={AddClientDocument}
	entity={graphqlName}
	{validation}
/>
