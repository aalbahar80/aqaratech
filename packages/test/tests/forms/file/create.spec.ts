import path from 'node:path';

import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { verifyUploadedFile } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';
import { FileFormPage } from '../file-form-model';

test.use({ createBucket: true });

const FILES = {
	png: path.resolve(__dirname, './samples/upload-test.png'),
	pdf: path.resolve(__dirname, '../../components/pdf/invoice-paid-sample.pdf'),

	// NOTE: make sure to test large pdf uploads while starting server with node
	// build/index.js, which enforces BODY_SIZE_LIMIT just like production. On
	// the other hand, vite dev/preview will always allow large uploads.
	// This can lead to a scenario where large uploads work in vite dev/preview
	// but fail in production.
	pdfLarge: path.resolve(__dirname, './samples/sample-pdf-large.pdf'),
};

for (const [name, filePath] of Object.entries(FILES)) {
	test(`file can be uploaded ${name}`, async ({ page, request, portfolio }) => {
		const fileName = `test-file-upload-${name}`;
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

		await page.getByRole('link', { name: 'New', exact: true }).click();

		const form = new FileFormPage(page);
		await form.setFile(fileName, filePath);
		await form.save();

		await expect(page).toHaveURL(url);

		const key = `portfolio/${portfolio.id}/${fileName}`;

		await verifyUploadedFile({
			key,
			localFilePath: filePath,
			request,
			organizationId: portfolio.organizationId,
		});
	});
}
