<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Units';
	import { AddUnitDocument } from './_add.gql';
</script>

<FormCS
	{fieldList}
	insertDoc={AddUnitDocument}
	entity={graphqlName}
	{validation}
/>
