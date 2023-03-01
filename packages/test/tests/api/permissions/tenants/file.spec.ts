import { expect } from '@playwright/test';
import { withQuery } from 'ufo';

import type { FileRelationKey } from '@self/utils';

import { prisma } from '../../../../prisma';
import { test } from '../../api-fixtures';

test.use({
	baseURL: process.env.PUBLIC_API_URL,
	createBucket: true,
	userRoleType: 'TENANT',
});

test('can upload file in own MO', async ({ request, lease, tenant }) => {
	const maintenanceOrder = await prisma.maintenanceOrder.create({
		data: {
			title: 'test',
			organizationId: tenant.organizationId,
			portfolioId: lease.portfolioId,
			tenantId: tenant.id,
		},
	});

	const relationKey = 'maintenanceOrder' satisfies FileRelationKey;
	const relationValue = maintenanceOrder.id;

	const url = withQuery(
		`organizations/${maintenanceOrder.organizationId}/files`,
		{ relationKey, relationValue },
	);

	const fileName = 'test.txt';

	const res = await request.post(url, {
		multipart: {
			fileName: fileName,
			relationKey,
			relationValue,
			file: {
				name: fileName,
				mimeType: 'text/plain',
				buffer: Buffer.from('hello world'),
			},
		},
	});

	expect(res.status()).toBe(201);

	const data = await res.text();
	expect(data).toBe('test.txt');
});

test('cannot upload file in other MO', async ({ request, lease, tenant }) => {
	const maintenanceOrder = await prisma.maintenanceOrder.create({
		data: {
			title: 'test',
			organizationId: tenant.organizationId,
			portfolioId: lease.portfolioId,
		},
	});

	const relationKey = 'maintenanceOrder' satisfies FileRelationKey;
	const relationValue = maintenanceOrder.id;

	const url = withQuery(
		`organizations/${maintenanceOrder.organizationId}/files`,
		{ relationKey, relationValue },
	);

	const fileName = 'test.txt';

	const res = await request.post(url, {
		multipart: {
			fileName: fileName,
			relationKey,
			relationValue,
			file: {
				name: fileName,
				mimeType: 'text/plain',
				buffer: Buffer.from('hello world'),
			},
		},
	});

	expect(res.status()).toBe(403);
});
