<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { getLabel, type Entity } from '@self/utils';

	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { createModalDelete } from '$lib/components/toast/create-modal-delete';
	import { openModal } from '$lib/components/toast/Modal.svelte';
	import { addSuccessToast } from '$lib/stores/toast';

	import type { PaginatedRoleDto, RoleDto } from '$api/openapi';

	import { createApi } from '$api';
	import { handleApiError } from '$api/handle-api-error';

	export let data: PaginatedRoleDto;
	export let predefined: {
		relationKey: Extract<Entity, 'organization' | 'portfolio' | 'tenant'>;
		relationValue: string;
	};

	const columnHelper = createColumnHelper<RoleDto>();

	const columns = [
		columnHelper.accessor('email', { header: getLabel('email') }),

		columnHelper.display({
			id: 'remove',
			header: '',
			cell: (props) => {
				const role = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: 'Remove',
						onClick: () => {
							openModal(
								createModalDelete({
									onDelete: async (api) => {
										await api.roles.remove({
											id: role.id,
											organizationId: $page.params.organizationId!,
										});

										await invalidateAll();

										return;
									},
								}),
							);
						},
					},
				});
			},
		}),

		columnHelper.display({
			id: 'sendInvite',
			header: '',
			cell: (props) => {
				const role = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: 'Send Invite',
						onClick: async () => {
							try {
								await createApi().roles.sendInvite({
									organizationId: role.organizationId,
									roleId: role.id,
								});

								addSuccessToast('Invite sent');

								await invalidateAll();
							} catch (e) {
								console.error(e);

								await handleApiError(e);
							}
						},
					},
				});
			},
		}),
	];
</script>

<Table items={data.results} paginationDto={data.pagination} {columns}>
	<div slot="filter">
		<FilterBar>
			<div slot="custom">
				<FilterBarButtonForm
					getRouteOptions={{
						entity: 'role',
						predefined,
					}}
				/>
			</div>
		</FilterBar>
	</div>
</Table>
