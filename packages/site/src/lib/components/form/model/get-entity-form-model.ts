import { expenseFormModel } from '$lib/components/form/model/expense';
import { expenseCategoryFormModel } from '$lib/components/form/model/expense-category';
import { fileFormModel } from '$lib/components/form/model/file';
import type { FormTypeEnum } from '$lib/components/form/model/form-model';
import { leaseFormModel } from '$lib/components/form/model/lease';
import { leaseInvoiceFormModel } from '$lib/components/form/model/lease-invoice';
import { organizationFormModel } from '$lib/components/form/model/organization';
import { payoutFormModel } from '$lib/components/form/model/payout';
import { portfolioFormModel } from '$lib/components/form/model/portfolio';
import { propertyFormModel } from '$lib/components/form/model/property';
import { roleFormModel } from '$lib/components/form/model/role';
import { tenantFormModel } from '$lib/components/form/model/tenant';
import { unitFormModel } from '$lib/components/form/model/unit';

export const entityFormModeMap = {
	organization: organizationFormModel,
	tenant: tenantFormModel,
	portfolio: portfolioFormModel,
	property: propertyFormModel,
	unit: unitFormModel,
	lease: leaseFormModel,
	leaseInvoice: leaseInvoiceFormModel,
	role: roleFormModel,
	expense: expenseFormModel,
	expenseCategory: expenseCategoryFormModel,
	file: fileFormModel,
	payout: payoutFormModel,
} as const;

export const getEntityFormModel = <
	T extends keyof typeof entityFormModeMap,
	Factory extends typeof entityFormModeMap[T] = typeof entityFormModeMap[T],
>({
	entity,
	pageType,
}: {
	// entity: keyof typeof entityFormModeMap extends infer E ? T & E : never;
	entity: T;
	pageType: FormTypeEnum;
}): ReturnType<Factory> => {
	if (entity in entityFormModeMap) {
		const factory = entityFormModeMap[entity];

		return factory(pageType);
	} else {
		throw new Error(`No form model for entity ${entity}`);
	}
};
