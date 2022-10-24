<script lang="ts">
	import { createApi } from '$api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { environment } from '$lib/environment';
	import { Field } from '$lib/models/classes/Field.class';
	import {
		entitiesMap,
		fileCreateSchema,
		type FileRelationKey,
	} from '@self/utils';

	export let relationKey: FileRelationKey;
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
	schema={fileCreateSchema}
	entity="file"
	formType="create"
	{basicFields}
	onSubmit={async (values) => {
		// Avoid using FilesApi.createFile() because of a bug with uploading files.

		const formData = new FormData();

		for (const key in values) {
			formData.append(key, values[key]);
		}

		const url = `${environment.PUBLIC_API_URL}/organizations/${$page.data.user?.role?.organizationId}/files`;
		await fetch(url, {
			method: 'POST',
			credentials: 'include',
			body: formData,
		});
	}}
	onSuccess={() =>
		goto(`/${entitiesMap[relationKey].urlName}/${relationValue}`)}
/>
