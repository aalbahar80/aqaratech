import { expenseFormModel } from '$lib/components/form/model/expense';
import { expenseCategoryFormModel } from '$lib/components/form/model/expense-category';
import { fileFormModel } from '$lib/components/form/model/file';
import { leaseFormModel } from '$lib/components/form/model/lease';
import { leaseInvoiceFormModel } from '$lib/components/form/model/lease-invoice';
import { maintenanceOrderFormModel } from '$lib/components/form/model/maintenance-order';
import { organizationFormModel } from '$lib/components/form/model/organization';
import { payoutFormModel } from '$lib/components/form/model/payout';
import { portfolioFormModel } from '$lib/components/form/model/portfolio';
import { propertyFormModel } from '$lib/components/form/model/property';
import { roleFormModel } from '$lib/components/form/model/role';
import { tenantFormModel } from '$lib/components/form/model/tenant';
import { unitFormModel } from '$lib/components/form/model/unit';

const entityFormModeMap = {
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
	maintenanceOrder: maintenanceOrderFormModel,
};

export const getEntityFormModel = <
	T extends keyof typeof entityFormModeMap = never,
>({
	entity,
}: {
	entity: T extends keyof typeof entityFormModeMap ? T : never;
}) => {
	return entityFormModeMap[entity]() as ReturnType<typeof entityFormModeMap[T]>;
};
