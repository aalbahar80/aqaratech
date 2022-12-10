import paidStamp from '../../../assets/paid-stamp.png';

import type { LeaseInvoiceDto } from '$api/openapi';
import type jsPDFInvoiceTemplate from '../../pdf/jspdf-invoice-template';

/**
 * Only works in browser. Do not call server-side.
 */
export const createPDF = async (options: PDFOptions) => {
	// use inline import because `jsPDFInvoiceTemplate` package only works in browser
	const pdfPkg = await import('../../pdf/jspdf-invoice-template');
	const props = preparePDF(options);
	// @ts-expect-error satisfies
	pdfPkg.default(props).jsPDFDocObject;
};

/**
 * Returns a object that can be used to create a pdf.
 *
 * @example
 * const props = invoiceToPdf({ invoice, outputType: 'dataurlnewwindow' }); // prepare
 * jsPDFInvoiceTemplate(props); // create pdf
 */
export const preparePDF = (options: PDFOptions) => {
	// We might benefit from using https://github.com/unjs/defu here.

	// clone defaultPdfOptions to ensure that the original is not mutated
	const pdf = { ...defaultPdfOptions };

	const { invoice } = options;
	pdf.outputType = options.outputType;
	const total = invoice.amount.toLocaleString('en-KW', {
		style: 'currency',
		currency: 'KWD',
	});
	pdf.returnJsPDFDocObject = true;

	// pdf.footer.text = invoice.id;
	pdf.invoice.table = [['1', invoice.memo ?? '', total]];
	// @ts-expect-error satisfies
	pdf.invoice.additionalRows[0].col2 = total;

	// Tenant
	pdf.contact.name = invoice.breadcrumbs.tenant.label;

	// Address
	const property = invoice.breadcrumbs.property.label;
	const unit = invoice.breadcrumbs.unit.label;
	pdf.contact.address = property;
	pdf.contact.phone = unit;

	// Dates
	const postAt = invoice.postAt.substring(0, 10);
	pdf.invoice.invGenDate = `Invoice date: ${postAt}`;
	if (invoice.isPaid && invoice.paidAt) {
		// @ts-expect-error until satisfied is supported
		pdf.stamp = stamp;
		const paidAt = invoice.paidAt.substring(0, 10);
		pdf.invoice.invDate = `Payment date: ${paidAt}`;
	}

	return pdf;
};

// @ts-expect-error satisfies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const stamp = {
	inAllPages: true,
	// src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
	src: paidStamp,
	// original aspect ratio = 2185/1332 = 1.64
	width: 48,
	height: 30,
	margin: { top: -150, left: 130 },
};
// } satisfies PdfProps['stamp'];

/**
 * https://github.com/edisonneza/jspdf-invoice-template
 */

const defaultPdfOptions = {
	outputType: 'save',
	returnJsPDFDocObject: true,
	fileName: 'Invoice.pdf',
	orientationLandscape: false,
	compress: true,
	// logo: {
	// 	src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
	// 	width: 53.33, //aspect ratio = width/height
	// 	height: 26.66,
	// 	margin: {
	// 		top: 0, //negative or positive num, from the current position
	// 		left: 0, //negative or positive num, from the current position
	// 	},
	// },
	business: {
		name: 'Aqaratech',
		website: 'www.aqaratech.com',
	},
	contact: {
		name: '',
		address: '',
		phone: '',
		label: 'Invoice issued for:',
	},
	invoice: {
		invDate: '',
		invGenDate: '',
		table: [['', '', '']],
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
			{
				title: 'Total',
				style: {
					width: 40,
				},
			},
		],
		additionalRows: [
			{
				col1: 'Total:',
				col2: '',
				style: {
					fontSize: 14, //optional, default 12
				},
			},
		],

		// invDescLabel: 'Invoice Note',
		// 	invDesc:
		// 		"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
	},
	// footer: {
	// 	text: 'The invoice is created on a computer and is valid without the signature and stamp.',
	// },
	pageEnable: true,
	pageLabel: 'Page ',
};
// } satisfies PdfProps;
