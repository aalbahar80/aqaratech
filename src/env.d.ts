/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_AUTH0_CLIENT_ID: string;
	readonly VITE_AUTH0_REDIRECT_URI: string;
	readonly VITE_AUTH0_CLIENT_SECRET: string;
	readonly VITE_MYFATOORAH_BASE_URL: string;
	readonly VITE_MYFATOORAH_TOKEN: string;
	readonly VITE_PINO_API_KEY: string;
	readonly VITE_PINO_SOURCE_TOKEN: string;
	readonly VITE_MOBILE: string;
	readonly VITE_DOMAIN: string;
	readonly VITE_TWILIO_ACCOUNT_SID: string;
	readonly VITE_TWILIO_AUTH_TOKEN: string;
}
