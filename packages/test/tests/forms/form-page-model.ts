import { expect, Locator, Page } from '@playwright/test';
import { Entity, formatValue, getLabel, getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
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
		await this.saveButton.click();
	}

	async goto() {
		const formUrl = this.getFormUrl();
		await this.page.goto(formUrl);
	}

	fillForm = async (fields: Record<string, unknown>) => {
		const labeled = R.mapKeys(fields, (key) => getLabel(key));

		for (const [key, value] of Object.entries(labeled)) {
			// The key may be followed by an asterisk.
			const keyRegex = new RegExp(`${key}|${key} \\*`);

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

			const SELECT_KEYS = ['type'].map((key) => getLabel(key));

			if (SELECT_KEYS.includes(key)) {
				const select = this.page.getByLabel(keyRegex);

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
				// TODO: Handle other types as needed
				throw new Error(`Unsupported value type: ${typeof value}`);
			}

			await this.page.getByLabel(keyRegex).fill(valueString);
		}
	};

	/**
	 * Verify that all the field properties are present as dt/dd pairs.
	 */
	verifyDetails = async (fields: Record<string, unknown>) => {
		for (const [key, value] of Object.entries(fields)) {
			const pane = this.page.locator('#detailsPane');
			await expect(pane).toBeVisible();

			const row = pane.getByTestId(key);
			await expect(row).toBeVisible();

			const dt = row.getByRole('term');
			await expect.soft(dt).toHaveText(getLabel(key));

			const dd = row.getByRole('definition');
			await expect.soft(dd).toHaveText(formatValue(value));
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
