import type { APIResponse } from '@playwright/test';

export const resCheck = (res: APIResponse) => {
	if (!res.ok()) {
		throw new Error(`Request failed: ${res.status()} ${res.statusText()}`);
	}
};
