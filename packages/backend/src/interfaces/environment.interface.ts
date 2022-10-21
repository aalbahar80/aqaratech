import { NodeOptions } from '@sentry/node';
import { ApiConfigType } from 'src/types/api.type';
import { DebugConfigType } from 'src/types/debug.type';
import { MeiliSearchConfigType } from 'src/types/meiliSearch.type';
import { R2ConfigType } from 'src/types/r2.type';
import { SiteConfigType } from 'src/types/site.type';
import { LoggerOptions } from 'winston';
import type { AqaratechEnv } from '../../../../types/environment';
import type { AuthConfigType } from '../types/auth.type';
import type { MailConfigType } from '../types/mail.type';

export type EnvironmentType = 'DEVELOPMENT' | 'PRODUCTION';

type BackendEnv = Pick<
	AqaratechEnv,
	'PUBLIC_AQARATECH_ENV' | 'PUBLIC_AQ_DEBUG_LEVEL' | 'LOGTAIL_TOKEN'
>;

export interface EnvironmentConfig extends BackendEnv {
	type: EnvironmentType;
	envName: 'dev' | 'prod';
	apiConfig: ApiConfigType;
	authConfig: AuthConfigType;
	mailConfig: MailConfigType;
	debug: DebugConfigType;
	meiliSearchConfig: MeiliSearchConfigType;
	siteConfig: SiteConfigType;
	r2Config: R2ConfigType;
	winston: LoggerOptions;
	sentry: NodeOptions;
}
