<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import {
		fieldList,
		validation,
		graphqlName,
	} from '$lib/definitions/Properties';
	import { AddPropertyDocument } from './_add.gql';
</script>

<FormCS
	{fieldList}
	insertDoc={AddPropertyDocument}
	entity={graphqlName}
	{validation}
/>
