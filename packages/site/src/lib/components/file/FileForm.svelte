<script lang="ts">
	import { createApi } from '$api';
	import type { CreateRelationKeyEnum } from '$api/openapi';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { schema } from '$lib/models/schemas/file-schema';
	import { entitiesMap } from '@self/utils';

	export let relationKey: CreateRelationKeyEnum;
	export let relationValue: string;

	const basicFields = [
		new Field('organizationId', {
			value: $page.data.user?.role?.organizationId,
			disabled: true,
			autoInit: true,
			hidden: true,
		}),
		new Field('relationKey', {
			value: relationKey,
			disabled: true,
			autoInit: true,
			hidden: true,
		}),
		new Field('relationValue', {
			value: relationValue,
			disabled: true,
			autoInit: true,
			hidden: true,
		}),
		new Field('fileName', {
			value: '',
		}),
		// new Field('label', {
		// 	value: '',
		// }),
		new Field('file', {
			value: '',
			type: 'file',
		}),
	];
</script>

<Form
	{schema}
	entity="file"
	formType="create"
	{basicFields}
	onSubmit={(values) => {
		return createApi().files.create(values);
	}}
	onSuccess={() =>
		goto(`/${entitiesMap[relationKey].urlName}/${relationValue}`)}
/>
