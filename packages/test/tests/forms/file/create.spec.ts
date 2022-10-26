import { expect } from '@playwright/test';
import { entitiesMap } from '@self/utils';
import { promises } from 'node:fs';
import { withQuery } from 'ufo';
import { getPresignedUrl } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';

const localFilePath = './tests/forms/file/upload-test.png';

test('file can be uploaded', async ({ page, request, portfolio }) => {
	const fileName = 'test-file-upload';
	// TODO add random characters to file name for cleaner testing

	// upload file
	const form = withQuery('/files/new', {
		relationKey: 'portfolio',
		relationValue: portfolio.id,
	});

	await page.goto(form);
	await page.locator('input[name="fileName"]').fill(fileName);
	await page.locator('input[name="file"]').setInputFiles(localFilePath);
	await page.locator('text=Save').click();

	await expect(page).toHaveURL(
		`/${entitiesMap.portfolio.urlName}/${portfolio.id}`,
	);

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
