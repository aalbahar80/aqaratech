/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_AUTH0_CLIENT_ID: string;
	readonly VITE_AUTH0_REDIRECT_URI: string;
	readonly VITE_AUTH0_CLIENT_SECRET: string;
}
