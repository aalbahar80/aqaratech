import { environment } from '$aqenvironment';

export const isProd = environment.PUBLIC_AQARATECH_ENV === 'production';
