<script lang="ts">
	import { key } from '$components/keyyy';
	import type { DocumentNode } from 'graphql';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { FieldList } from '$components/form/Field';
	import TableGeneric from './table/TableGeneric.svelte';
	import ModalEdit from '$components/modal/ModalEdit.svelte';

	export let title: string;
	export let graphQlName: string;
	export let fieldList: FieldList;

	export let listDoc: DocumentNode;
	export let insertDoc: DocumentNode = undefined;
	export let updateDoc: DocumentNode = undefined;
	export let deleteDoc: DocumentNode;

	export const fieldListStore = writable(fieldList);
	export const isFetchingStore = writable(false);

	setContext(key, {
		getFieldList: () => fieldListStore,
		getGraphQlName: () => graphQlName,
		getListDoc: () => listDoc,
		getInsertDoc: () => insertDoc,
		getUpdateDoc: () => updateDoc,
		getDeleteDoc: () => deleteDoc,
		getIsFetching: () => isFetchingStore
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<TableGeneric />
