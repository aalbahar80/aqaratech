import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { test as base } from '../../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExpenseSample {
	amount: number;
	url: string;
	dashboardUrl: string;
	postAt: {
		day: number;
		month: number;
		year: number;
		asString: string;
	};
}

base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
const test = base.extend<{ expense: ExpenseSample }>({
	expense: async ({ page }, use) => {
		// don't use low numbers to avoid 1+ matches
		const amount = Math.floor(Math.random() * 899) + 100;

		const year = Math.floor(Math.random() * 100) + 2000;

		// use number greater than 2 to allow for subtraction later
		// use number greater less than 8 to allow for addition later without leading zeroes
		const month = Math.floor(Math.random() * 7) + 2;
		const day = Math.floor(Math.random() * 7) + 2;
		const postAt = {
			day,
			month,
			year,
			asString: `${year.toString()}-0${month.toString()}-0${day.toString()}`,
		};

		await page.goto('/new/expenses');
		await page.locator('input[name="amount"]').fill(amount.toString());
		await page.locator('input[name="postAt"]').fill(postAt.asString);
		await page.selectOption('#categoryId', { index: 1 });
		await page.locator('input[name="memo"]').fill('some memo here');
		await page.selectOption('#portfolioId', { index: 0 });
		await page.locator('div[role="radio"]:has-text("Portfolio")').click();
		await Promise.all([
			page.waitForNavigation(),
			page.locator('text=Create new').click(),
		]);

		const url = page.url();
		await Promise.all([
			page.waitForNavigation(),
			page.locator('[aria-label="Breadcrumb"] >> text=Portfolio').click(),
		]);

		await page.locator('text=Dashboard').click();
		const dashboardUrl = page.url();

		const expense = {
			amount,
			postAt,
			url,
			dashboardUrl,
		};
		await use(expense);
	},
});

test('Expense included in start range', async ({ page, expense }) => {
	await page.locator('input[name="start"]').fill(expense.postAt.asString);
	const month = expense.postAt.month + 1;
	await page
		.locator('input[name="end"]')
		.fill(`${expense.postAt.year.toString()}-0${month.toString()}-01`);

	const expenseCard = page.locator('data-test-id=dashcard', {
		has: page.locator('h3:has-text("Expenses")'),
	});
	await expenseCard.locator('button:has-text("Data")').click();

	const amountCell = page
		.locator(`text=KWD ${expense.amount.toString()}`)
		.first();
	await expect
		.soft(amountCell)
		.toContainText(`KWD ${expense.amount.toString()}`);

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		// https://playwright.dev/docs/selectors#augmenting-existing-locators
		page
			.locator(`a:right-of(:text("KWD ${expense.amount.toString()}"))`)
			.first()
			.click(),
	]);
	await expect.soft(page1).toHaveURL(expense.url);
});

test('Expense included in end range', async ({ page, expense }) => {
	const month = expense.postAt.month - 1;
	await page
		.locator('input[name="start"]')
		.fill(`${expense.postAt.year.toString()}-0${month.toString()}-01`);
	await page.locator('input[name="end"]').fill(expense.postAt.asString);

	const expenseCard = page.locator('data-test-id=dashcard', {
		has: page.locator('h3:has-text("Expenses")'),
	});
	await expenseCard.locator('button:has-text("Data")').click();

	const amountCell = page
		.locator(`text=KWD ${expense.amount.toString()}`)
		.first();
	await expect
		.soft(amountCell)
		.toContainText(`KWD ${expense.amount.toString()}`);

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		page
			.locator(`a:right-of(:text("KWD ${expense.amount.toString()}"))`)
			.first()
			.click(),
	]);
	await expect.soft(page1).toHaveURL(expense.url);
});
