import toast from 'svelte-french-toast';

export const addSuccessToast = (subtitle = 'Success') => {
	toast.success(subtitle);
};

export const addErrorToast = (subtitle?: string | undefined) => {
	toast.error(subtitle ?? 'Error');
};
