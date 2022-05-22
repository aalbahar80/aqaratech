import type { MailConfigType } from '$lib/models/types/mail.type';
import type { AuthConfigType } from '$models/types/auth.type';
import type { MyFatoorahConfigType } from '$models/types/myfatoorah.type';
import type { TwilioConfigType } from '$models/types/twilio.type';

export type EnvironmentType = 'DEVELOPMENT' | 'PRODUCTION';

export interface EnvironmentConfig {
	type: EnvironmentType;
	envName: 'dev' | 'prod';
	urlOrigin: string;
	myfatoorahConfig: MyFatoorahConfigType;
	twilioConfig: TwilioConfigType;
	authConfig: AuthConfigType;
	mailConfig: MailConfigType;
	debug: boolean;
}
