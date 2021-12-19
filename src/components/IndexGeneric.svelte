<script lang="ts">
	import { key } from '$components/keyyy';
	import type { DocumentNode } from 'graphql';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Field } from '$components/form/Field';
	import TableGeneric from './table/TableGeneric.svelte';
	import ModalEdit from '$components/modal/ModalEdit.svelte';

	export let graphqlName: string;
	export let fieldList: Field[];

	export let listDoc: DocumentNode;
	export let deleteDoc: DocumentNode;

	export const fieldListStore = writable(Field.addLinkField(fieldList));
	export const isFetchingStore = writable(false);

	setContext(key, {
		getFieldList: () => fieldListStore,
		getGraphQlName: () => graphqlName,
		getListDoc: () => listDoc,
		getDeleteDoc: () => deleteDoc,
		getIsFetching: () => isFetchingStore
	});
</script>

<TableGeneric />
