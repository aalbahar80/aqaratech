<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Units';
</script>

<FormCS
	{fieldList}
	insertDoc={AddUnitDocument}
	entity={graphqlName}
	{validation}
/>
