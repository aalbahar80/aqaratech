import { createApi, type Api } from '$api';
import { handleApiError } from '$api/handle-api-error';
import { goto } from '$app/navigation';
import type { ModalContent } from '$lib/components/toast/modal-content';
import { addSuccessToast } from '$lib/stores/toast';

/**
 * Factory function to create ModalContent for a delete modal.
 */
export const createModalDelete = ({
	deletePrompt,
	onDelete,
}: {
	deletePrompt?: string | undefined;
	onDelete: (api: Api) => Promise<string>;
}): ModalContent => {
	return {
		title: 'Delete',
		description: 'Are you sure?',
		deletePrompt: deletePrompt ?? '',
		onConfirm: async () => {
			try {
				const url = await onDelete(createApi());
				addSuccessToast();
				void goto(url);
			} catch (error) {
				await handleApiError(error);
			}
		},
	};
};
