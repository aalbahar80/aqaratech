<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Tenants';
	import { TenantsInsertDocument } from './[id]/_[id].gql';
</script>

<FormCS
	{fieldList}
	insertDoc={TenantsInsertDocument}
	entity={graphqlName}
	{validation}
/>
