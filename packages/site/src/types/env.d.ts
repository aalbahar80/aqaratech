/// <reference types="node" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * An indicator that the app is deployed and running on Vercel. Example: `1`.
			 */
			readonly VERCEL: string;

			/**
			 * The Environment that the app is deployed an running on. The value can be either `production`, `preview`, or `development`.
			 */
			readonly VERCEL_ENV: 'production' | 'preview' | 'development';

			/**
			 * The git branch of the commit the deployment was triggered by. Example: `improve-about-page`.
			 */
			readonly VERCEL_GIT_COMMIT_REF: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
