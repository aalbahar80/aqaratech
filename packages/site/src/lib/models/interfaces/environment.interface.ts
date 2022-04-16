import type { AuthConfigType } from '$models/types/auth.type';
import type { MyFatoorahConfigType } from '$models/types/myfatoorah.type';
import type { TwilioConfigType } from '$models/types/twilio.type';

export enum EnvironmentType {
	'DEVELOPMENT',
	'STAGING',
	'PRODUCTION',
}

export interface EnvironmentConfig {
	type: EnvironmentType;
	name: string;
	myfatoorahConfig: MyFatoorahConfigType;
	twilioConfig: TwilioConfigType;
	authConfig: AuthConfigType;
	debug: boolean;
}
