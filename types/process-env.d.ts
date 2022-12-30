import type { UnverfiedAqaratechEnv } from '../packages/utils/src/config/env/aqaratech-env';

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends UnverfiedAqaratechEnv {}
	}
}
