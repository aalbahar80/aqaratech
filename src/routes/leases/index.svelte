<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { leases } from '$lib/definitions/ref';
	const { docs, fieldList, graphqlName } = leases;
</script>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.del}
/>
