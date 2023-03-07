import { expect } from '@playwright/test';

import { PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'leaseInvoice';
const pageType = PageType.Edit;

test('invoice paid online cannot be updated', async ({
	org,
	portfolio,
	invoice,
	page,
}) => {
	await prisma.leaseInvoice.update({
		where: { id: invoice.id },
		data: {
			isPaid: true,
			mfPaymentId: 'testmfpaymentid',
			paidAt: new Date(),
			postAt: new Date(Date.now() - 10000),
		},
	});

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: invoice.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.save();

	const message = 'Cannot update invoices that were paid online.';

	await expect(page.getByText(message)).toBeVisible();
});
