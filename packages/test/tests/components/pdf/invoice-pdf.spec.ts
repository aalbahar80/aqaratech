import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../../api/api-fixtures';

const entity = 'leaseInvoice';

test.use({
	invoicesParams: [
		{
			isPaid: true,
			postAt: '2020-01-01',
			paidAt: '2020-01-02',
		},
	],
});

test.setTimeout(30000);
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

	const stream = await download.createReadStream();

	if (!stream) {
		throw new Error('No stream');
	}

	const buffer = await new Promise<Buffer>((resolve) => {
		const buffers: Buffer[] = [];

		stream.on('data', (chunk) => buffers.push(chunk));
		stream.on('end', () => resolve(Buffer.concat(buffers)));
	});

	expect(buffer).toMatchSnapshot(['pdf', 'paid']);
});
