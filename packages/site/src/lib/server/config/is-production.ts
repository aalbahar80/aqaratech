import { env } from '$env/dynamic/public';

export const isProd = env.PUBLIC_AQARATECH_ENV === 'production';
