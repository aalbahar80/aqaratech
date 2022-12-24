import { promises } from 'node:fs';

import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { getPresignedUrl } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';
import { FileFormPage } from '../file-form-model';

const localFilePath = './tests/forms/file/upload-test.png';

test('file can be uploaded', async ({ page, request, portfolio }) => {
	const fileName = 'test-file-upload';
	// TODO add random characters to file name for cleaner testing

	// upload file
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageTab.Files,
		id: portfolio.id,
		params: {
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url);

	await page.getByRole('link', { name: 'New' }).click();

	const form = new FileFormPage(page);
	await form.setFile(fileName, localFilePath);
	await form.save();

	await expect(page).toHaveURL(url);

	// grab uploaded file

	const key = `portfolio/${portfolio.id}/${fileName}`;

	const presignedUrl = await getPresignedUrl({ request, key });

	const res = await request.get(presignedUrl);

	const uploadedFile = await res.body();

	// file buffer matches

	const localFile = await promises.readFile(localFilePath);

	expect(uploadedFile.toString()).toEqual(localFile.toString());

	// file size matches

	expect(uploadedFile).toHaveLength(localFile.length);
});
