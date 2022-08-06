import type { LeaseInvoiceDto } from '@self/sdk';
import type jsPDFInvoiceTemplate from 'jspdf-invoice-template';

/**
 * Only works in browser. Do not call server-side.
 */
export const createPDF = async (options: PDFOptions) => {
	// use inline import because `jsPDFInvoiceTemplate` package only works in browser
	const pdfPkg = (await import('jspdf-invoice-template')).default;
	const props = preparePDF(options);
	pdfPkg(props);
};

/**
 * Returns a object that can be used to create a pdf.
 *
 * @example
 * const props = invoiceToPdf({ invoice, outputType: 'dataurlnewwindow' }); // prepare
 * jsPDFInvoiceTemplate(props); // create pdf
 */
export const preparePDF = (options: PDFOptions): PdfProps => {
	const { invoice } = options;
	defaultObj.outputType = options.outputType;
	const total = invoice.amount.toLocaleString('en-KW', {
		style: 'currency',
		currency: 'KWD',
	});

	defaultObj.footer.text = invoice.id;
	defaultObj.invoice.table = [['1', invoice.memo, total]];
	defaultObj.invoice.additionalRows[0].col2 = total;

	// Tenant
	defaultObj.contact.name = invoice.breadcrumbs.tenant.label;

	// Dates
	const postAt = invoice.postAt.split('T')[0];
	defaultObj.invoice.invGenDate = `Invoice date: ${postAt}`;
	if (invoice.isPaid && invoice.paidAt) {
		defaultObj.stamp = stamp;
		const paidAt = invoice.paidAt.split('T')[0];
		defaultObj.invoice.invDate = `Payment date: ${paidAt}`;
	}

	return defaultObj;
};

type PdfProps = Parameters<typeof jsPDFInvoiceTemplate>[0];
type OutputType =
	| 'save'
	| 'datauri'
	| 'dataurl'
	| 'dataurlnewwindow'
	| 'blob'
	| 'arraybuffer'
	| 'dataurlnewwindow'
	| 'pdfjsnewwindow'
	| 'pdfobjectnewwindow';

interface PDFOptions {
	invoice: LeaseInvoiceDto;
	outputType: OutputType;
}

const stamp: PdfProps['stamp'] = {
	inAllPages: true,
	// src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
	src: 'http://localhost:3000/paid-stamp.png',
	// original aspect ratio = 2185/1332 = 1.64
	width: 48,
	height: 30,
	margin: { top: -150, left: 130 },
};

/**
 * https://github.com/edisonneza/jspdf-invoice-template
 */
const defaultObj: PdfProps = {
	outputType: 'dataurlnewwindow',
	returnJsPDFDocObject: true,
	fileName: 'Invoice.pdf',
	orientationLandscape: false,
	compress: true,
	logo: {
		src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
		width: 53.33, //aspect ratio = width/height
		height: 26.66,
		margin: {
			top: 0, //negative or positive num, from the current position
			left: 0, //negative or positive num, from the current position
		},
	},
	business: {
		name: 'Aqaratech',
		website: 'www.aqaratech.com',
	},
	contact: {
		label: 'Invoice issued for:',
		address: '123 Main St',
	},
	invoice: {
		// label: 'Invoice #: ',
		// num: 19,
		headerBorder: true,
		tableBodyBorder: true,
		header: [
			{
				title: '#',
				style: {
					width: 10,
				},
			},
			{
				title: 'Description',
				style: {
					width: 140,
				},
			},
			{ title: 'Total' },
		],
		additionalRows: [
			{
				col1: 'Total:',
				// col2: 'AMOUNT',
				style: {
					fontSize: 14, //optional, default 12
				},
			},
		],

		// invDescLabel: 'Invoice Note',
		// 	invDesc:
		// 		"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
	},
	footer: {
		text: 'The invoice is created on a computer and is valid without the signature and stamp.',
	},
	pageEnable: true,
	pageLabel: 'Page ',
};
