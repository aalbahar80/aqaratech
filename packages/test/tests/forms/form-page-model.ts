import { expect, type Locator, type Page } from '@playwright/test';
import * as R from 'remeda';

import {
	formatValue,
	getLabel,
	getRoute,
	isDateOnly,
	PageType,
	type Entity,
	fmt,
} from '@self/utils';

import { uuid } from '../../utils/uuid';

import { Combobox, ComboboxOption } from './combobox-model';

export class FormPage {
	readonly page: Page;
	readonly saveButton: Locator;
	readonly options: FormPageOptions | undefined;

	constructor(page: Page, options?: FormPageOptions) {
		this.page = page;
		this.saveButton = page.getByRole('button', { name: 'Save' });
		this.options = options;
	}

	async save() {
		// check that network request was fired,
		// if not, fail with a message
		// PERF: set timeout to fail faster
		// NOTE: wait for ANY request?
		const requestPromise = this.page.waitForRequest(
			(request) => request.method() === 'POST' || request.method() === 'PATCH',
		);

		await this.saveButton.click();

		// only assert that the request was fired
		const request = await requestPromise;

		expect(request, 'Save button fired a network request').toBeTruthy();
	}

	async goto() {
		const formUrl = this.getFormUrl();
		await this.page.goto(formUrl);
		await expect(this.page).toHaveURL(formUrl);
	}

	fillForm = async (
		fields: Record<string, unknown>,
		/** Opt-out of automically inferring labels. */
		customFields?: Record<string, unknown>,
	) => {
		const labeled = R.mapKeys(fields, (key) => getLabel(key));

		for (const [key, value] of Object.entries(customFields ?? labeled)) {
			// The key may be followed by an asterisk.
			const keyRegex = key;

			// Combobox Fields

			if (Combobox.keys.includes(key)) {
				if (value instanceof ComboboxOption) {
					await new Combobox({
						page: this.page,
						key,
					}).fill(value);

					continue;
				} else {
					throw new Error(`Invalid value for combobox field ${key}`);
				}
			}

			// Checkbox Fields

			if (value === true || value === false) {
				const checkbox = this.page.getByLabel(keyRegex);

				await checkbox.setChecked(value);

				continue;
			}

			// Select Fields

			const SELECT_KEYS = ['type', 'status'].map((key) => getLabel(key));

			if (SELECT_KEYS.includes(key)) {
				const select = this.page.getByLabel(keyRegex);

				if (typeof value !== 'string') {
					console.log(value);
					throw new Error(`Invalid value for select field ${key}`);
				}

				await select.selectOption({ label: value });

				continue;
			}

			// Other Fields

			let valueString: string;

			if (typeof value === 'string') {
				valueString = value;
			} else if (typeof value === 'number') {
				valueString = value.toString();
			} else if (value === null) {
				valueString = '';
			} else {
				throw new Error(`Unsupported value type: ${typeof value}`);
			}

			await this.page.getByLabel(keyRegex, { exact: true }).fill(valueString);
		}
	};

	/**
	 * Verify that all the field properties are present as dt/dd pairs.
	 */
	verifyDetails = async (fields: Record<string, unknown>) => {
		for (const [key, value] of Object.entries(fields)) {
			const row = this.page.getByTestId('details-pane').getByTestId(key);
			await expect(row).toBeVisible();

			// const dt = row.getByRole('term');
			// await expect.soft(dt).toHaveText(key);

			const dd = row.getByRole('definition');
			const formattedValue = formatValue(value);

			if (key === 'amount' && typeof value === 'number') {
				const currency = fmt({ locale: 'en', type: 'currency', value: value });
				await expect(dd).toHaveText(new RegExp(`^${value}$|^${currency}$`));
				await expect
					.soft(dd)
					.toHaveAttribute(
						'data-testid',
						new RegExp(`^${this.toTestId(value)}$|^${currency}$`),
					);
			} else {
				await expect(dd).toHaveText(formattedValue);

				// date-only fields are always parsed to ISO 8601 format in db
				const testValue =
					typeof value === 'string' && isDateOnly(value)
						? new Date(value).toISOString()
						: value;

				await expect
					.soft(dd)
					.toHaveAttribute('data-testid', this.toTestId(testValue));
			}
		}
	};

	readonly getSuccessUrl = () => {
		if (!this.options) {
			throw new Error('Cannot get success URL without options');
		}

		const successUrl = getRoute({
			id: this.options.id ?? ':uuid',
			entity: this.options.entity,
			pageType: PageType.Id,
			params: this.toParams(this.options.fixtures),
		});

		return this.options.id ? successUrl : uuid(successUrl);
	};

	toParams({
		org,
		portfolio,
	}: {
		org: { organization: { id: string } };
		portfolio?: { id: string };
	}) {
		const params: Record<string, string> = {
			organizationId: org.organization.id,
		};

		if (portfolio) {
			params['portfolioId'] = portfolio.id;
		}

		return params;
	}

	/**
	 * Return a stringified version of the value for use in test ids
	 */
	private readonly toTestId = (value: unknown) => {
		if (typeof value === 'string') {
			return value;
		} else if (typeof value === 'number') {
			return value.toString();
		} else if (value === undefined || value === null) {
			return '';
		} else {
			return JSON.stringify(value);
		}
	};

	private readonly getFormUrl = () => {
		if (!this.options) {
			throw new Error('Cannot get form URL without options');
		}

		if (this.options.pageType === PageType.Edit) {
			return getRoute({
				id: this.options.id,
				entity: this.options.entity,
				pageType: this.options.pageType,
				params: this.toParams(this.options.fixtures),
			});
		} else {
			return getRoute({
				entity: this.options.entity,
				pageType: this.options.pageType,
				params: this.toParams(this.options.fixtures),
			});
		}
	};
}

// Types

interface BaseFormPageOptions {
	// File and member forms not yet supported. They require predefined values.
	entity: Exclude<Entity, 'file' | 'role'>;
	pageType: PageType.New | PageType.Edit;
	fixtures: {
		org: { organization: { id: string } };
		portfolio?: { id: string };
	};
}

interface FormPageEditOptions extends BaseFormPageOptions {
	pageType: PageType.Edit;
	id: string;
}

interface FormPageNewOptions extends BaseFormPageOptions {
	id?: never;
	pageType: PageType.New;
}

type FormPageOptions = FormPageEditOptions | FormPageNewOptions;
