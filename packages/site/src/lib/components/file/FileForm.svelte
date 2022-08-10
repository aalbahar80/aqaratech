<script lang="ts">
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { schema } from '$lib/models/schemas/file-schema';
	import type { CreateRelationKeyEnum } from '@self/sdk';

	export let relationKey: CreateRelationKeyEnum;
	export let relationValue: string;

	const basicFields = [
		new Field('organizationId', {
			value: $session.user?.role?.organizationId,
			disabled: true,
			autoInit: true,
		}),
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
	onSubmit={(values) => {
		return $page.stuff.api.files.create(values);
	}}
	onSuccess={() => goto(`/${relationKey}/${relationValue}`)}
/>
