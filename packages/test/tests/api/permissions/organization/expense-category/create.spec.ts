import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseCategoryFactory } from '@self/seed';

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

// LabelEn

const invalidLabelEn = [null, undefined, 1, true, false, [], {}, ''];

for (const [index, labelEn] of invalidLabelEn.entries()) {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

		expect(await res.json()).toHaveProperty('fieldErrors.labelEn');
	});

	test(`cannot update expenseCategory with invalid labelEn ${index}: ${labelEn}`, async ({
		request,
		org,
		expenseCategory,
	}) => {
		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.patch(`${url}/${expenseCategory.id}`, {
			data: {
				...R.pick(expenseCategory, ['isGroup']),
				labelEn,
			},
		});

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);

		expect(await res.json()).toHaveProperty('fieldErrors.labelEn');
	});
}

// LabelAr

const invalidLabelAr = [1, true, false, [], {}];

for (const [index, labelAr] of invalidLabelAr.entries()) {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	test(`cannot create expenseCategory with invalid labelAr ${index}: ${labelAr}`, async ({
		request,
		org,
	}) => {
		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.post(url, {
			data: {
				...R.pick(expenseCategory, ['labelEn', 'isGroup']),
				labelAr,
			},
		});

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);

		expect(await res.json()).toHaveProperty('fieldErrors.labelAr');
	});

	test(`cannot update expenseCategory with invalid labelAr ${index}: ${labelAr}`, async ({
		request,
		org,
		expenseCategory,
	}) => {
		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.patch(`${url}/${expenseCategory.id}`, {
			data: {
				...R.pick(expenseCategory, ['labelEn', 'isGroup']),
				labelAr,
			},
		});

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);

		expect(await res.json()).toHaveProperty('fieldErrors.labelAr');
	});
}

// isGroup

const invalidIsGroup = [null, 1, [], {}, '', 'invalid'];

for (const [index, isGroup] of invalidIsGroup.entries()) {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

		expect(await res.json()).toHaveProperty('fieldErrors.isGroup');
	});
}

const invalidIsGroupUpdate = [null, 1, [], {}, '', 'invalid'];

for (const [index, isGroup] of invalidIsGroupUpdate.entries()) {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	test(`cannot update expenseCategory.isGroup ${index}: ${isGroup}`, async ({
		request,
		org,
		expenseCategory,
	}) => {
		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.patch(`${url}/${expenseCategory.id}`, {
			data: {
				...R.pick(expenseCategory, ['labelEn']),
				isGroup,
			},
		});

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);

		expect(await res.json()).toHaveProperty('formErrors', [
			"Unrecognized key(s) in object: 'isGroup'",
		]);
	});
}
