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

			/**
			 * Auth0 claims namespace as configured in Auth0 (login) action
			 */
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

			/**
			 * Domain used for callbacks (Twilio, myFatoorah)
			 */
			readonly CALLBACK_DOMAIN: string;

			/**
			 * Phone number used for myfatoorah invoices when not in production
			 */
			readonly MYFATOORAH_PHONE: string;

			/**
			 * Email used for myfatoorah invoices when not in production
			 */
			readonly MYFATOORAH_EMAIL: string;

			/**
			 * An indicator that the app is deployed and running on Vercel. Example: `1`.
			 */
			readonly VERCEL: string;

			/**
			 * Email used for myfatoorah invoices when not in production
			 * The URL of the deployment. Example: `my-site-7q03y4pi5.vercel.app`
			 */
			readonly VERCEL_URL: string;

			/**
			 * The Environment that the app is deployed an running on. The value can be either `production`, `preview`, or `development`.
			 */
			readonly VERCEL_ENV: 'production' | 'preview' | 'development';
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
