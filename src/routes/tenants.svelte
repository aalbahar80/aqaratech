<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { tenants } from '$lib/definitions/ref';
	const { docs, fieldList, graphqlName } = tenants;
</script>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.del}
/>
