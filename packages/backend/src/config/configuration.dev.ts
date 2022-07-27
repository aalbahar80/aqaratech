import type { EnvironmentConfig } from '../interfaces/environment.interface';

export const developmentEnvironment = (): EnvironmentConfig => ({
  type: 'DEVELOPMENT',
  envName: 'dev',
  authConfig: {
    AUTH0_CLIENT_ID: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
    AUTH0_CLIENT_SECRET:
      'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf',
    AUTH0_DOMAIN: 'https://dev-eehvhdp2.eu.auth0.com',
    AUTH0_API_NAMESPACE: 'https://letand.be',
    AUTH0_API_AUDIENCE: 'letand.be/api',
  },
  mailConfig: {
    POSTMARK_TOKEN:
      process.env.POSTMARK_TOKEN || 'aecd4fd3-1314-44e9-b1b5-d7dbb89fd0ca',
  },
  debug: {
    DEBUG_NEST: process.env.AQ_DEBUG_NEST == '1',
    DEBUG_PRISMA: process.env.AQ_DEBUG_PRISMA == '1',
  },
  meiliSearchConfig: {
    HOST: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
    API_KEY: process.env.MEILI_MASTER_KEY || 'MASTER_KEY',
  },
  siteConfig: {
    SITE_ORIGIN: process.env.SITE_ORIGIN || 'http://localhost:3000',
  },
});
