import type { FormTypeEnum } from '$lib/components/form/model/form-model';
import { leaseFormModel } from '$lib/components/form/model/lease';
import { portfolioFormModel } from '$lib/components/form/model/portfolio';
import { propertyFormModel } from '$lib/components/form/model/property';
import { roleFormModel } from '$lib/components/form/model/role';
import { tenantFormModel } from '$lib/components/form/model/tenant';
import { unitFormModel } from '$lib/components/form/model/unit';

export const entityFormModeMap = {
	tenant: tenantFormModel,
	portfolio: portfolioFormModel,
	property: propertyFormModel,
	unit: unitFormModel,
	lease: leaseFormModel,
	role: roleFormModel,
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
