/// <reference types="node" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * Auth0 client identifier provided by Auth0
			 * @example '0oajq1q4qj7qj7qj7qj7qj7qj7qj7qj7q'
			 * @see https://auth0.com/docs/quickstart/backend/nodejs/01-authorization#configuration
			 */
			readonly AUTH0_CLIENT_ID: string;

			/**
			 * Auth0 client secret provided by Auth0
			 */
			readonly AUTH0_CLIENT_SECRET: string;

			/**
			 * Auth0 domain as configured in Auth0
			 */
			readonly AUTH0_DOMAIN: string;
			readonly AUTH0_REDIRECT_URI: string;
			readonly AUTH0_API_NAMESPACE: string;
			readonly AUTH0_API_AUDIENCE: string;

			/**
			 * MyFatoorah API key
			 */
			readonly MYFATOORAH_TOKEN: string;
			readonly MYFATOORAH_BASE_URL: string;

			readonly TWILIO_ACCOUNT_SID: string;
			readonly TWILIO_AUTH_TOKEN: string;
			readonly TWILIO_FROM_NUMBER: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
