import type { GSuiteConfigType } from '$lib/models/types/gsuite.type';
import type { AuthConfigType } from '$models/types/auth.type';
import type { MyFatoorahConfigType } from '$models/types/myfatoorah.type';
import type { TwilioConfigType } from '$models/types/twilio.type';

export enum EnvironmentType {
	'DEVELOPMENT',
	'PRODUCTION',
}

export interface EnvironmentConfig {
	type: EnvironmentType;
	name: string;
	callbackDomain: string;
	myfatoorahConfig: MyFatoorahConfigType;
	twilioConfig: TwilioConfigType;
	authConfig: AuthConfigType;
	gsuiteConfig: GSuiteConfigType;
	debug: boolean;
}
