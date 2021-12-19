<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { units } from '$lib/definitions/ref';
	const { docs, fieldList, graphqlName } = units;
</script>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.del}
/>
