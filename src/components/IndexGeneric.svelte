<script lang="ts">
	import { key } from '$components/keyyy';
	import type { DocumentNode } from 'graphql';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Field } from '$components/form/Field';
	import TableGeneric from './table/TableGeneric.svelte';
	import ModalEdit from '$components/modal/ModalEdit.svelte';

	export let graphqlName: string;
	export let fieldList: Field[];

	export let listDoc: DocumentNode;
	export let insertDoc: DocumentNode = undefined;
	export let updateDoc: DocumentNode = undefined;
	export let deleteDoc: DocumentNode;

	export const fieldListStore = writable(fieldList);
	export const isFetchingStore = writable(false);

	setContext(key, {
		getFieldList: () => fieldListStore,
		getGraphQlName: () => graphqlName,
		getListDoc: () => listDoc,
		getInsertDoc: () => insertDoc,
		getUpdateDoc: () => updateDoc,
		getDeleteDoc: () => deleteDoc,
		getIsFetching: () => isFetchingStore
	});
</script>

<TableGeneric />
