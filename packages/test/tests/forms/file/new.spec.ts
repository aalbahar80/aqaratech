import { APIRequestContext, expect } from '@playwright/test';
import { sample } from '@self/seed';
import { entitiesMap } from '@self/utils';
import { promises } from 'node:fs';
import { test } from '../../../config';

const fileEntity = entitiesMap.file;
const portfolioEntity = entitiesMap.portfolio;
const portfolio = sample.portfolios[0];
const localFilePath = './tests/forms/file/upload-test.png';

const params = new URLSearchParams({
	relationKey: portfolioEntity.title,
	relationValue: portfolio.id,
});

const url = `/${fileEntity.urlName}/new?${params.toString()}`;

test('files can be uploaded', async ({ page, request, apiBaseURL }) => {
	const fileName = 'test-file-upload';
	// TODO add random characters to file name for cleaner testing

	// upload file
	await page.goto(url);
	await page.locator('input[name="fileName"]').fill(fileName);
	await page.locator('input[name="file"]').setInputFiles(localFilePath);
	await page.locator('text=Save').click();

	await expect(page).toHaveURL(`/${portfolioEntity.urlName}/${portfolio.id}`);

	// grab uploaded file
	const presignedUrl = await getPresignedUrl({
		fileName,
		apiBaseURL,
		request,
	});
	const res = await request.get(presignedUrl);
	const uploadedFile = await res.body();

	// file buffer matches
	const localFile = await promises.readFile(localFilePath);
	expect(uploadedFile.toString()).toEqual(localFile.toString());

	// file size matches
	expect(uploadedFile.length).toEqual(localFile.length);
});

test('files can be deleted', async ({ page, request, apiBaseURL }) => {
	const fileName = 'test-file-delete';
	const key = `${portfolioEntity.title}/${portfolio.id}/${fileName}`;

	// upload file
	await page.goto(url);
	await page.locator('input[name="fileName"]').fill(fileName);
	await page.locator('input[name="file"]').setInputFiles(localFilePath);
	await page.locator('text=Save').click();

	await expect(page).toHaveURL(`/${portfolioEntity.urlName}/${portfolio.id}`);

	// grab uploaded file
	const presignedUrl = await getPresignedUrl({
		fileName,
		apiBaseURL,
		request,
	});
	const res = await request.get(presignedUrl);
	const uploadedFile = await res.body();

	// file buffer matches
	const localFile = await promises.readFile(localFilePath);
	expect(uploadedFile.toString()).toEqual(localFile.toString());

	// file size matches
	expect(uploadedFile.length).toEqual(localFile.length);

	// delete file
	const card = page.locator(`data-testid=${key}`);
	await card.locator('data-testid=dropdown-menu').click();
	await page.locator('button:has-text("Delete")').click();

	const res2 = await request.get(presignedUrl);
	expect(res2.status()).toBe(404);
});

const getPresignedUrl = async ({
	request,
	fileName,
	apiBaseURL,
}: {
	request: APIRequestContext;
	fileName: string;
	apiBaseURL: string;
}) => {
	const key = `${portfolioEntity.title}/${portfolio.id}/${fileName}`;
	const response = await request.get(
		`${apiBaseURL}/${fileEntity.urlName}/find-one?key=${encodeURIComponent(
			key,
		)}`,
	);
	expect(response.status()).toBe(200);

	const presignedUrl = await response.text();
	return presignedUrl;
};
