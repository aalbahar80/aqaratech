<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import tenants from '$lib/definitions/Tenants';
	import { TenantsInsertDocument } from './[id]/_[id].gql';

	const { fieldList, graphqlName, validation } = tenants;
</script>

<FormCS
	{fieldList}
	insertDoc={TenantsInsertDocument}
	entity={graphqlName}
	{validation}
/>
