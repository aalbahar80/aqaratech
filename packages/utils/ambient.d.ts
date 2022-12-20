import type { AqaratechEnv } from '../../types/environment';

declare global {
	namespace NodeJS {
		// ignore eslint error to be able to access process.env using dot notation
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends AqaratechEnv {}
	}
}
