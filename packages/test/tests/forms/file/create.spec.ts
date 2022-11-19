import { expect } from '@playwright/test';
import { getRoute, PageTab } from '@self/utils';
import { promises } from 'node:fs';
import { getPresignedUrl } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';

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

	await page.getByRole('link', { name: 'Attach files' }).click();

	await page.getByLabel('File Name').fill(fileName);
	await page.getByLabel('File *').setInputFiles(localFilePath);
	await page.getByRole('button', { name: 'Save' }).click();

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

	expect(uploadedFile.length).toEqual(localFile.length);
});
