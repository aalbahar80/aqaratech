export { handleApiError } from '$api/handle-api-error';
import toast from 'svelte-french-toast';

export const addSuccessToast = (subtitle = 'Success') => {
	toast.success(subtitle);
};

export const addErrorToast = (subtitle?: string | undefined) => {
	toast.error(subtitle ?? 'Error');
};

export const addToast = (options: ToastItem) => {
	// TODO: check all implementations to see
	// if we can only keep one of title and subtitle
	if (options.props.kind === 'error') {
		toast.error(options.props.subtitle ?? '');
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	} else if (options.props.kind === 'success') {
		toast.success(options.props.subtitle ?? '');
	}
};

interface ToastItem {
	duration?: number;
	props: { title: string; subtitle?: string; kind: 'success' | 'error' };
}
