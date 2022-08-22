/// <reference types="node" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly PUBLIC_SITE_URL: string;
			readonly PUBLIC_API_URL: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
