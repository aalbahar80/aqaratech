import { invalidateAll } from '$app/navigation';

import type { FileDto } from '$api/openapi';

import { createModalDelete } from '$lib/components/toast/create-modal-delete';
import { openModal } from '$lib/components/toast/Modal.svelte';

export const remove = (file: FileDto, organizationId: string) => {
	// @typescript-eslint fails to infer type of exported function `openModal`
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	openModal(
		createModalDelete({
			onDelete: async (api) => {
				await api.files.remove({
					id: file.id,
					organizationId,
				});

				await invalidateAll();

				return;
			},
		}),
	);
};
