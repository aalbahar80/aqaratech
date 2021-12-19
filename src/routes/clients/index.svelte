<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { clients } from '$lib/definitions/ref';

	const { docs, fieldList, graphqlName } = clients;
</script>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.del}
/>
