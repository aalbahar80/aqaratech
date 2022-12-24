import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { getPresignedUrl } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';
import { Modal } from '../../models/modal';

test('file can be deleted', async ({ page, request, portfolio, file }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTab.Files,
		params: {
			organizationId: portfolio.organizationId,
		},
	});

	await page.goto(url);

	await page.getByRole('button', { name: 'Delete' }).click();

	const modal = new Modal({ page });
	await modal.deleteConfirm();
	await modal.waitForHidden();

	// presigned url

	const presignedUrl = await getPresignedUrl({
		request,
		key: file,
	});

	const res = await request.fetch(presignedUrl);

	expect.soft(res.status()).toBe(404);

	// api url
	// skipping this test for now

	// const url = withQuery(`${apiURL}/files/find-one`, {
	// 	key: file,
	// });

	// const res2 = await request.get(url);

	// expect(res2.status()).toBe(404);
});
