/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly SITE_ORIGIN: string;
      readonly POSTMARK_TOKEN: string;
      readonly MEILISEARCH_HOST: string;
      readonly MEILISEARCH_API_KEY: string;
      readonly AUTH0_CLIENT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
