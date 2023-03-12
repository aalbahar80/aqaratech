const invoicePath = '/En/KWT/PayInvoice/Result';

/** ex. https://demo.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=100202303436098464 */
export const getMyfatoorahReceipt = ({
	paymentId,
	myfatoorahURL,
}: {
	paymentId: string;
	myfatoorahURL: string;
}) => `${myfatoorahURL}${invoicePath}?paymentId=${paymentId}`;
