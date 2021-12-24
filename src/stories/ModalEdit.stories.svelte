<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ModalEdit from '$components/modal/ModalEdit.svelte';
</script>

<Meta title="ModalEdit" component={ModalEdit} />

<Template let:args>
	<ModalEdit />
</Template>

<Story name="Add" />

<Story name="Edit">
	<ModalEdit
		existing={{
			id: 999,
			first_name: 'Mohammad',
			last_name: 'Salah',
			email: 'moSalah@gmail.com',
			phone: '12345678',
		}}
	/>
</Story>

<Story name="Error">
	<ModalEdit
		existing={{
			id: 999,
			first_name: 'iwillfail',
			last_name: 'Salah',
			email: 'moSalah@gmail.com',
			phone: '12345678',
		}}
	/>
</Story>
