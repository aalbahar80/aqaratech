import { DebugConfigType } from 'src/types/debug.type';
import type { AuthConfigType } from '../types/auth.type';
import type { MailConfigType } from '../types/mail.type';
import type { MyFatoorahConfigType } from '../types/myfatoorah.type';
import type { TwilioConfigType } from '../types/twilio.type';

export type EnvironmentType = 'DEVELOPMENT' | 'PRODUCTION';

export interface EnvironmentConfig {
  type: EnvironmentType;
  envName: 'dev' | 'prod';
  urlOrigin: string;
  myfatoorahConfig: MyFatoorahConfigType;
  twilioConfig: TwilioConfigType;
  authConfig: AuthConfigType;
  mailConfig: MailConfigType;
  debug: DebugConfigType;
}
