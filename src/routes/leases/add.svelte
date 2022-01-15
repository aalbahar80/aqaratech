<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Leases';
	import { AddLeaseDocument } from './_add.gql';
</script>

<FormCS
	{fieldList}
	insertDoc={AddLeaseDocument}
	entity={graphqlName}
	{validation}
/>
