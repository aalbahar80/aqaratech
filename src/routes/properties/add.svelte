<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import {
		fieldList,
		validation,
		graphqlName,
	} from '$lib/definitions/Properties';
</script>

<FormCS
	{fieldList}
	insertDoc={AddPropertyDocument}
	entity={graphqlName}
	{validation}
/>
