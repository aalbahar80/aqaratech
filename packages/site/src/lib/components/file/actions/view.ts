import type { FileDto } from '$api/openapi';

import { createApi } from '$api';

export const view = async (file: FileDto) => {
	// encode file name to avoid special characters
	const url = await createApi().files.findOne({
		key: file.key,
	});

	// opens in new tab because of content-disposition header
	window.open(url);
};
