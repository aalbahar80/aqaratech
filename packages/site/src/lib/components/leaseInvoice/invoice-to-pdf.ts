import type { LeaseInvoiceDto } from '@self/sdk';
import type jsPDFInvoiceTemplate from 'jspdf-invoice-template';

/**
 * Only works in browser. Do not call server-side.
 */
export const createPDF = async (invoice: LeaseInvoiceDto) => {
	// use inline import because package only works in browser
	const pdfPkg = (await import('jspdf-invoice-template')).default;
	const props = preparePDF(invoice);
	pdfPkg(props);
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

/**
 * Takes a lease invoice and returns a object that can be used to create a pdf.
 *
 * @example
 * const props = invoiceToPdf(invoice); // prepare
 * jsPDFInvoiceTemplate(props); // create pdf
 */
export const preparePDF = (invoice: LeaseInvoiceDto): PdfProps => {
	const outputType: OutputType = 'dataurlnewwindow';
	defaultObj.outputType = outputType;
	return defaultObj;
};

const defaultObj = {
	outputType: 'save',
	returnJsPDFDocObject: true,
	fileName: 'Invoice 2022',
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
		src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
		width: 20, //aspect ratio = width/height
		height: 20,
		margin: {
			top: 0, //negative or positive num, from the current position
			left: 0, //negative or positive num, from the current position
		},
	},
	business: {
		name: 'Business Name',
		address: 'Albania, Tirane ish-Dogana, Durres 2001',
		phone: '(+355) 069 11 11 111',
		email: 'email@example.com',
		email_1: 'info@example.al',
		website: 'www.example.al',
	},
	contact: {
		label: 'Invoice issued for:',
		name: 'Client Name',
		address: 'Albania, Tirane, Astir',
		phone: '(+355) 069 22 22 222',
		email: 'client@website.al',
		otherInfo: 'www.website.al',
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
		table: Array.from(Array(15), (item, index) => [
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
				col3: 'ALL',
				style: {
					fontSize: 14, //optional, default 12
				},
			},
			{
				col1: 'VAT:',
				col2: '20',
				col3: '%',
				style: {
					fontSize: 10, //optional, default 12
				},
			},
			{
				col1: 'SubTotal:',
				col2: '116,199.90',
				col3: 'ALL',
				style: {
					fontSize: 10, //optional, default 12
				},
			},
		],

		invDescLabel: 'Invoice Note',
		invDesc:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
	},
	footer: {
		text: 'The invoice is created on a computer and is valid without the signature and stamp.',
	},
	pageEnable: true,
	pageLabel: 'Page ',
};
