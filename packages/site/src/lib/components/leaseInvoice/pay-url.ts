import { environment } from '$lib/environment';

export const getPayURL = (id: string) =>
	`${environment.PUBLIC_API_URL}/leaseInvoices/${id}/pay`;
