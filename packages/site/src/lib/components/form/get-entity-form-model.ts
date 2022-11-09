import { portfolioFormModel } from '$lib/components/portfolio/portfolio-form-model';
import { tenantFormModel } from '$lib/components/tenant/tenant-form-model';
import type { Entity } from '@self/utils';

// TODO use satisfies Record<Entity, FormModel<any>>
export const entityFormModeMap = {
	tenant: tenantFormModel(),
	portfolio: portfolioFormModel(),
};

export const getEntityFormModel = <T extends Entity>(
	entity: T,
): typeof entityFormModeMap[T] => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	if (entity in entityFormModeMap) {
		// @ts-expect-error until satisfies Record<Entity, FormModel<any>>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return entityFormModeMap[entity];
	} else {
		throw new Error(`No form model for entity ${entity}`);
	}
};
