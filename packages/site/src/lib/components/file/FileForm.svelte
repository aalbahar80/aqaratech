<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { schema } from '$lib/models/schemas/file-schema';
	import { idFieldToUrlName } from '$lib/utils/route-helpers';
	import type { FileForeignKeys } from '@self/sdk';

	export let relationKey: FileForeignKeys;
	export let relationValue: string;

	const basicFields = [
		new Field('relationKey', {
			value: relationKey,
			disabled: true,
			autoInit: true,
		}),
		new Field('relationValue', {
			value: relationValue,
			disabled: true,
			autoInit: true,
		}),
		new Field('fileName', {
			value: '',
		}),
		new Field('label', {
			value: '',
		}),
		new Field('file', {
			value: '',
			type: 'file',
		}),
	];
</script>

<Form
	{schema}
	entityTitle="files"
	formType="create"
	{basicFields}
	onSubmit={(values) => $page.stuff.api.files.create(values)}
	onSuccess={() => goto(`/${idFieldToUrlName(relationKey)}/${relationValue}`)}
/>
