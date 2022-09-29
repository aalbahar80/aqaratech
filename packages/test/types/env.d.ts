declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly PUBLIC_SITE_URL: string;
			readonly PUBLIC_API_URL: string;
		}
	}
}

export {};
