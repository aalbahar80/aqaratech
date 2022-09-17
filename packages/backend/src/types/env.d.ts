/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PUBLIC_AQARATECH_ENV:
        | 'production'
        | 'development'
        | 'staging'
        | undefined;

      readonly DATABASE_URL: string;

      readonly PUBLIC_SITE_URL: string;
      readonly PUBLIC_API_URL: string;
      readonly PUBLIC_API_URL_LOCAL: string;

      readonly AUTH0_CLIENT_SECRET: string;

      readonly POSTMARK_TOKEN: string;

      readonly R2_ACCOUNT_ID: string;
      readonly R2_ACCESS_KEY_ID: string;
      readonly R2_SECRET_ACCESS_KEY: string;

      readonly MEILISEARCH_HOST: string;
      readonly MEILISEARCH_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
