import type { UnverfiedAqaratechEnv } from '../packages/utils/src/config/env/aqaratech-env';

declare global {
	namespace NodeJS {
		interface ProcessEnv extends UnverfiedAqaratechEnv {}
		// type ProcessEnv = {
		// 	PUBLIC_SITE_URL: string;
		// };
	}
}
