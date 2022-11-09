import type { FormTypeEnum } from '$lib/components/form/form-model';
import { portfolioFormModel } from '$lib/components/portfolio/portfolio-form-model';
import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';

// TODO use satisfies Record<Entity, FormModel<any>>
export const entityFormModeMap = {
	tenant: tenantFormModel,
	portfolio: portfolioFormModel,
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
