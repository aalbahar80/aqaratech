<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { properties } from '$lib/definitions/ref';
	const { docs, fieldList, graphqlName } = properties;
</script>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.del}
/>
