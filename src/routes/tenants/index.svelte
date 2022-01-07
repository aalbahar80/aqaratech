<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { tenants } from '$lib/definitions/ref';
	import { TenantsListDocument } from './[id]/_[id].gql';

	const { fieldList, graphqlName } = tenants;
</script>

<TableCS listDoc={TenantsListDocument} {graphqlName} {fieldList} />
