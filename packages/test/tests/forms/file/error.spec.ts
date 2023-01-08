import { resolve } from 'node:path';

import { expect } from '@playwright/test';

import { getLabel, getRoute, PageType } from '@self/utils';

import { verifyUploadedFile } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';
import { FileFormPage } from '../file-form-model';

const localFilePath = resolve(__dirname, './upload-test.png');

test.describe('file form non-400 error', () => {
	test.use({
		// roletype has no signifance here. It's the fastest way to trigger a non-400 error.
		userRoleType: 'PORTFOLIO',
	});

	test('renders error page', async ({ scopedPage: page, portfolio }) => {
		const fileName = 'test-file-upload';

		// go straight to the form page, we want to test the error rendering only
		const url = getRoute({
			entity: 'file',
			pageType: PageType.New,
			params: {
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
			},
			predefined: {
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		});

		await page.goto(url);

		const form = new FileFormPage(page);
		await form.setFile(fileName, localFilePath);
		await form.save();

		const error = page.getByTestId('error-page');
		await expect(error).toBeVisible();
	});
});

test.describe('file form 400 error renders helpful error message', () => {
	test('invalid characters', async ({ page, portfolio }) => {
		const fileName = 'invalid file name';

		// go straight to the form page, we want to test the error rendering only
		const url = getRoute({
			entity: 'file',
			pageType: PageType.New,
			params: {
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
			},
			predefined: {
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		});

		await page.goto(url);

		const form = new FileFormPage(page);
		await form.setFile(fileName, localFilePath);

		await form.save();

		const message = page.getByText(
			'Invalid characters. Only letters, numbers, dashes, underscores, and periods are allowed.',
			{ exact: true },
		);

		await expect(message).toBeVisible();
	});

	test('filename length', async ({ page, portfolio }) => {
		const fileName = 'a'.repeat(101);

		// go straight to the form page, we want to test the error rendering only
		const url = getRoute({
			entity: 'file',
			pageType: PageType.New,
			params: {
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
			},
			predefined: {
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		});

		await page.goto(url);

		const form = new FileFormPage(page);
		await form.setFile(fileName, localFilePath);

		await form.save();

		const message = page.getByText(
			'File name must be 100 characters or less.',
			{ exact: true },
		);

		await expect(message).toBeVisible();
	});

	test('missing file', async ({ page, portfolio }) => {
		// go straight to the form page, we want to test the error rendering only
		const url = getRoute({
			entity: 'file',
			pageType: PageType.New,
			params: {
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
			},
			predefined: {
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		});

		await page.goto(url);

		const form = new FileFormPage(page);
		await page.getByLabel(getLabel('fileName')).fill('missing-file');

		await form.save();

		const message = page.getByText('File is required', { exact: true });

		await expect(message).toBeVisible();
	});
});

test('file form errors are recovarable', async ({
	page,
	portfolio,
	request,
}) => {
	const invalidFileName = 'invalid file name';
	const validFileName = 'valid-file-name';

	// go straight to the form page, we want to test the error rendering only
	const url = getRoute({
		entity: 'file',
		pageType: PageType.New,
		params: {
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		},
		predefined: {
			relationKey: 'portfolio',
			relationValue: portfolio.id,
		},
	});

	await page.goto(url);

	const form = new FileFormPage(page);
	await form.setFile(invalidFileName, localFilePath);

	await form.save();

	const message = page.getByText(
		'Invalid characters. Only letters, numbers, dashes, underscores, and periods are allowed.',
		{ exact: true },
	);

	await expect(message).toBeVisible();

	// fix the file name
	await page.getByLabel(getLabel('fileName')).fill(validFileName);

	await form.save();

	// wait for the request to complete before exiting browser
	await page.waitForNavigation();

	const key = `portfolio/${portfolio.id}/${validFileName}`;

	await verifyUploadedFile({
		key,
		localFilePath,
		request,
	});
});
