import { environment } from '$aqenvironment';

const invoicePath = '/En/KWT/PayInvoice/Result';

/** ex. https://demo.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=100202303436098464 */
export const getMyfatoorahReceipt = (paymentId: string) =>
	`${environment.PUBLIC_MYFATOORAH_SITE_URL}${invoicePath}?paymentId=${paymentId}`;
