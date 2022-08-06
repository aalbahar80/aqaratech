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
	defaultObj.outputType = options.outputType;
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
	stamp: {
		inAllPages: true,
		// src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
		src: 'http://localhost:3000/paid-stamp.png',
		// original aspect ratio = 2185/1332 = 1.64
		width: 48,
		height: 30,
		margin: { top: -150, left: 130 },
	},
	business: {
		name: 'Aqaratech',
		website: 'www.aqaratech.com',
	},
	contact: {
		label: 'Invoice issued for:',
		name: 'TENANTNAMEHERE',
	},
	invoice: {
		label: 'Invoice #: ',
		num: 19,
		invDate: 'Payment Date: 01/01/2021 18:12',
		invGenDate: 'Invoice Date: 02/02/2021 10:17',
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
				title: 'Title',
				style: {
					width: 30,
				},
			},
			{
				title: 'Description',
				style: {
					width: 80,
				},
			},
			{ title: 'Price' },
			{ title: 'Quantity' },
			{ title: 'Unit' },
			{ title: 'Total' },
		],
		table: Array.from(Array(1), (item, index) => [
			index + 1,
			'There are many variations ',
			'Lorem Ipsum is simply dummy text dummy text ',
			200.5,
			4.5,
			'm2',
			400.5,
		]),
		additionalRows: [
			{
				col1: 'Total:',
				col2: '145,250.50',
				// col3: 'ALL',
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
	// pageEnable: true,
	// pageLabel: 'Page ',
};
