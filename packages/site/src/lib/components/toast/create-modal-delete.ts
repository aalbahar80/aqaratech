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
	onDelete: OnDelete;
}): ModalContent => {
	return {
		title: 'Delete',
		description: 'Are you sure?',
		deletePrompt: deletePrompt ?? '',
		onConfirm: async () => {
			try {
				const url = await onDelete(createApi());
				addSuccessToast();
				if (url) {
					void goto(url);
				}
			} catch (error) {
				await handleApiError(error);
			}
		},
	};
};

/**
 * A function that is called when the delete button is clicked.
 *
 * It can return a URL to redirect to.
 */
export type OnDelete = (api: Api) => Promise<string> | Promise<void>;
