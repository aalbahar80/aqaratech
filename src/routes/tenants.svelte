<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { tenants } from '$lib/definitions/ref';
	import { TenantsListDocument } from './tenants/_[id].gql';
	const { docs, fieldList, graphqlName } = tenants;
</script>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={TenantsListDocument}
	deleteDoc={docs.del}
/>
