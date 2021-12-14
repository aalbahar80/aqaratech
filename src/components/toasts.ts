import { toast } from '@zerodevx/svelte-toast';

export const successToast = (m: string): number =>
	toast.push(m, {
		theme: {
			'--toastBackground': '#48BB78',
			'--toastBarBackground': '#2F855A'
		}
	});

export const failureToast = (m: string): number =>
	toast.push(m, {
		theme: {
			'--toastBackground': '#F56565',
			'--toastBarBackground': '#C53030'
		}
	});

export const warningToast = (m: string): number =>
	toast.push(m, {
		theme: {
			'--toastBackground': '#ff9900',
			'--toastBarBackground': '#d68100'
		}
	});
