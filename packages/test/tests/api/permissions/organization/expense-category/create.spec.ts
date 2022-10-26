import { expect } from '@playwright/test';
import { expenseCategoryFactory } from '@self/seed';
import * as R from 'remeda';
import { PostUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

const expenseCategory = R.omit(expenseCategoryFactory.build(), ['id']);

test('can create expenseCategory without optional fields', async ({
	request,
	org,
}) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.post(url, {
		data: R.pick(expenseCategory, ['labelEn', 'isGroup']),
	});

	expect(res.status()).toBe(201);
});

test('cannot create expenseCategory without required fields', async ({
	request,
	org,
}) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.post(url, {
		data: R.omit(expenseCategory, ['labelEn', 'isGroup']),
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create expenseCategory without labelEn', async ({
	request,
	org,
}) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.post(url, {
		data: R.pick(expenseCategory, ['isGroup']),
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create expenseCategory without isGroup', async ({
	request,
	org,
}) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.post(url, {
		data: R.pick(expenseCategory, ['labelEn']),
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create expenseCategory with invalid isGroup', async ({
	request,
	org,
}) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.post(url, {
		data: {
			...R.pick(expenseCategory, ['labelEn', 'isGroup']),
			isGroup: 'invalid',
		},
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

const invalidLabelEn = [null, undefined, 1, true, false, [], {}, ''];

for (const [index, labelEn] of invalidLabelEn.entries()) {
	test(`cannot create expenseCategory with invalid labelEn ${index}: ${labelEn}`, async ({
		request,
		org,
	}) => {
		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.post(url, {
			data: {
				...R.pick(expenseCategory, ['isGroup']),
				labelEn,
			},
		});

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);
	});
}

const invalidIsGroup = [null, undefined, 1, [], {}, '', 'invalid'];

for (const [index, isGroup] of invalidIsGroup.entries()) {
	test(`cannot create expenseCategory with invalid isGroup ${index}: ${isGroup}`, async ({
		request,
		org,
	}) => {
		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.post(url, {
			data: {
				...R.pick(expenseCategory, ['labelEn']),
				isGroup,
			},
		});

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);
	});
}
