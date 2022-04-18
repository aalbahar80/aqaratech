import { dev } from '$app/env';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';
import { EnvironmentType } from '$models/interfaces/environment.interface';
import dotenv from 'dotenv';

dotenv.config();

/**
 * This is currently only active locally based on `dev`.
 */
export const developmentEnvironment: EnvironmentConfig = {
	type: EnvironmentType.DEVELOPMENT,
	name: 'development',
	callbackDomain: process.env.CALLBACK_DOMAIN,
	authConfig: {
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
		AUTH0_API_NAMESPACE: process.env.AUTH0_API_NAMESPACE,
		AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE,
		AUTH0_REDIRECT_URI: dev
			? 'http://localhost:3000/api/auth/callback'
			: process.env.AUTH0_REDIRECT_URI,
	},
	myfatoorahConfig: {
		MYFATOORAH_BASE_URL: process.env.MYFATOORAH_BASE_URL,
		MYFATOORAH_TOKEN: process.env.MYFATOORAH_TOKEN,
		MYFATOORAH_EMAIL: process.env.MYFATOORAH_EMAIL,
		MYFATOORAH_PHONE: process.env.MYFATOORAH_PHONE,
	},
	twilioConfig: {
		TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
		TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER,
	},
	debug: true,
};
