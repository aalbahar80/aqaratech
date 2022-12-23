import type { AqaratechEnv } from '@self/utils';

declare global {
	namespace NodeJS {
		type ProcessEnv = AqaratechEnv;
	}
}
