<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Clients';
</script>

<FormCS
	{fieldList}
	insertDoc={AddClientDocument}
	entity={graphqlName}
	{validation}
/>
