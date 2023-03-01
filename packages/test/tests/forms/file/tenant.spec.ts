import path from 'node:path';

import { expect } from '@playwright/test';

import { prisma } from '@self/seed/src/prisma';
import { PageTab, getRoute } from '@self/utils';

import { verifyUploadedFile } from '../../../utils/get-presigned-url';
import { test } from '../../api/api-fixtures';
import { FileFormPage } from '../file-form-model';

test.use({
	createBucket: true,
	userRoleType: 'TENANT',
});

const filePath = path.resolve(__dirname, './samples/upload-test.png');

test(`tenant can upload file to maintenance order`, async ({
	page,
	request,
	lease,
	tenant,
}) => {
	const maintenanceOrder = await prisma.maintenanceOrder.create({
		data: {
			title: 'test',
			organizationId: tenant.organizationId,
			portfolioId: lease.portfolioId,
			tenantId: tenant.id,
		},
	});

	const fileName = `test-file-upload-tenant`;

	const url = getRoute({
		entity: 'maintenanceOrder',
		id: maintenanceOrder.id,
		pageType: PageTab.Files,
		params: {
			organizationId: maintenanceOrder.organizationId,
			portfolioId: maintenanceOrder.portfolioId,
		},
	});

	await page.goto(url);

	await page.getByRole('link', { name: 'New', exact: true }).click();

	const form = new FileFormPage(page);
	await form.setFile(fileName, filePath);
	await form.save();

	await expect(page).toHaveURL(url);

	const key = `maintenanceOrder/${maintenanceOrder.id}/${fileName}`;

	await verifyUploadedFile({
		key,
		localFilePath: filePath,
		request,
		organizationId: maintenanceOrder.organizationId,
	});
});
