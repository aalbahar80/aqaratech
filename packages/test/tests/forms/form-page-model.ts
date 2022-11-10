import type { Locator, Page } from '@playwright/test';
import { Entity, getLabel, getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { uuid } from '../../utils/uuid';

export class FormPage {
	readonly page: Page;
	readonly saveButton: Locator;
	readonly options: FormPageOptions | undefined;

	constructor(page: Page, options?: FormPageOptions) {
		this.page = page;
		this.options = options;
		this.saveButton = page.getByRole('button', { name: 'Save' });
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

			await this.page.getByLabel(key).fill(valueString);
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
				params: {
					organizationId: this.options.org.organization.id,
				},
			});
		} else {
			return getRoute({
				entity: this.options.entity,
				pageType: this.options.pageType,
				params: {
					organizationId: this.options.org.organization.id,
				},
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
			params: { organizationId: this.options.org.organization.id },
		});

		return this.options.id ? successUrl : uuid(successUrl);
	};
}

// Types

interface BaseFormPageOptions {
	entity: Entity;
	pageType: PageType.New | PageType.Edit;
	org: {
		organization: {
			id: string;
		};
	};
}

interface FormPageEditOptions extends BaseFormPageOptions {
	pageType: PageType.Edit;
	org: { organization: { id: string } };
	id: string;
}

interface FormPageNewOptions extends BaseFormPageOptions {
	id?: never;
	pageType: PageType.New;
	org: { organization: { id: string } };
}

type FormPageOptions = FormPageEditOptions | FormPageNewOptions;
