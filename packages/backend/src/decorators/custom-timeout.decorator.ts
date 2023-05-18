import { SetMetadata } from '@nestjs/common';

export const CUSTOM_TIMEOUT = 'customTimeout';

export const CustomTimeout = (timeout: number) =>
	SetMetadata(CUSTOM_TIMEOUT, timeout);
