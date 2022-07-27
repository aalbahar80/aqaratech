import { DebugConfigType } from 'src/types/debug.type';
import { MeiliSearchConfigType } from 'src/types/meiliSearch.type';
import { SiteConfigType } from 'src/types/site.type';
import type { AuthConfigType } from '../types/auth.type';
import type { MailConfigType } from '../types/mail.type';

export type EnvironmentType = 'DEVELOPMENT' | 'PRODUCTION';

export interface EnvironmentConfig {
  type: EnvironmentType;
  envName: 'dev' | 'prod';
  authConfig: AuthConfigType;
  mailConfig: MailConfigType;
  debug: DebugConfigType;
  meiliSearchConfig: MeiliSearchConfigType;
  siteConfig: SiteConfigType;
}
