import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import path from 'node:path';
import fs from 'node:fs';
import { test } from '../../api/api-fixtures';

const entity = 'leaseInvoice';

const SAMPLE_PATH = path.resolve(
	__dirname,
	'../../../downloads/invoice-paid-sample.pdf',
);

const PDF_PATH = path.resolve(__dirname, '../../../downloads/invoice-paid.pdf');

test.use({
	tenantsParams: [
		{
			fullName: 'Test Tenant',
		},
	],

	propertiesParams: [
		{
			area: 'بيان',
			block: '1',
			avenue: '2',
			street: '3',
			number: '44',
		},
	],

	unitsParams: [
		{
			type: 'apartment',
			unitNumber: '100',
		},
	],

	invoicesParams: [
		{
			isPaid: true,
			postAt: '2020-01-01',
			paidAt: '2020-01-02',
			amount: 100,
			memo: 'memo',
		},
	],
});

test('invoice pdf', async ({ page, org, portfolio, invoice }) => {
	const url = getRoute({
		entity,
		pageType: PageType.Id,
		id: invoice.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url);

	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('button', { name: 'Print' }).click(),
	]);

	// await download.saveAs(SAMPLE_PATH);
	await download.saveAs(PDF_PATH);

	const pdf = await fs.promises.readFile(PDF_PATH);
	const sample = await fs.promises.readFile(SAMPLE_PATH);

	// don't include the date/id in the comparison
	const sampleText = sample
		.toString()
		.replace(/CreationDate.*/, '')
		.replace(/ID.*/g, '');

	const pdfText = pdf
		.toString()
		.replace(/CreationDate.*/, '')
		.replace(/ID.*/g, '');

	// console.log({ pdf });
	// console.log({ sample });

	// console.log({
	// 	sample: sample.length,
	// 	sampleText: sampleText.length,
	// 	sampleTrimmed: sampleText.length - sample.length,
	// 	pdf: pdf.length,
	// 	pdfText: pdfText.length,
	// 	pdfTrimmed: pdfText.length - pdf.length,
	// });

	expect(pdfText).toEqual(sampleText);
});
