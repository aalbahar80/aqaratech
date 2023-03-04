import type { FileDto } from '$api/openapi';

import { createApi } from '$api';

export const view = async (file: FileDto, organizationId: string) => {
	// encode file name to avoid special characters
	const url = await createApi().files.findOne({
		id: file.id,
		organizationId,
	});

	// opens in new tab because of content-disposition header
	// window.open(url);

	// open in same tab
	// @ts-expect-error overkill
	window.location = url;
};
