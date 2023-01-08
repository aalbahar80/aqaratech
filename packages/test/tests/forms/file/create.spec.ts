import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { verifyUploadedFile } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';
import { FileFormPage } from '../file-form-model';

const FILES = {
	png: './tests/forms/file/upload-test.png',
	pdf: './tests/components/pdf/invoice-paid-sample.pdf',
	pdfLarge: './tests/forms/file/samples/sample-pdf-large.pdf',
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
		});
	});
}
