import type { AqaratechEnv } from '../../types/environment';

declare global {
	namespace NodeJS {
		type ProcessEnv = AqaratechEnv;
	}
}
