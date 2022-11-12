import type { FormTypeEnum } from '$lib/components/form/model/form-model';
import { portfolioFormModel } from '$lib/components/form/model/portfolio';
import { propertyFormModel } from '$lib/components/form/model/property';
import { roleFormModel } from '$lib/components/form/model/role';
import { tenantFormModel } from '$lib/components/form/model/tenant';

export const entityFormModeMap = {
	tenant: tenantFormModel,
	portfolio: portfolioFormModel,
	property: propertyFormModel,
	role: roleFormModel,
} as const;

export const getEntityFormModel = <T extends keyof typeof entityFormModeMap>({
	entity,
	pageType,
}: {
	entity: T;
	pageType: FormTypeEnum;
}) => {
	if (entity in entityFormModeMap) {
		const factory = entityFormModeMap[entity];

		return factory(pageType);
	} else {
		throw new Error(`No form model for entity ${entity}`);
	}
};
