import type { Feature } from './feature.schema';

export interface AqaratechEnv {
	readonly PUBLIC_AQARATECH_ENV: 'production' | 'development' | 'staging';
	readonly PUBLIC_IS_TESTING?: boolean;

	// URL's

	/**
	 * The current url origin where the site is hosted.
	 * In development, this could be `http://localhost:3000`.
	 * In a docker environment behind a reverse proxy, this could be something like: `https://aqar.live`,
	 * Handles production, vercel previews, and local dev.
	 * Returns a preview branch's dedicated domain if it exists `https://stage.letand.be`,
	 * otherwise return the deployment domain  `https://my-site-7q03y4pi5.vercel.app`.
	 */
	readonly PUBLIC_SITE_URL: string;

	/**
	 * Api url reachable from the client.
	 * In development, this could be `http://localhost:3002`.
	 * In a docker environment behind a reverse proxy, this could be something like: `https://aqar.live/api`,
	 * where the reverse proxy strips the `/api` path and forwards the request to the backend.
	 * Doing so allows us to avoid a preflight requests and serve both site and api from the same origin.
	 */
	readonly PUBLIC_API_URL: string;

	/**
	 * Api url reachable from the server. Used to access the api from the svelte-kit server.
	 * In development, this could be `http://backend:3002` since both site and backend are on the same docker compose network.
	 * In production, this could be the same as PUBLIC_API_URL.
	 *
	 * From: https://kit.svelte.dev/docs/hooks#externalfetch
	 *
	 * For example, your load function might make a request to a public URL like https://api.yourapp.com when the user performs a client-side navigation to the respective page, but during SSR it might make sense to hit the API directly (bypassing whatever proxies and load balancers sit between it and the public internet).
	 */
	readonly PUBLIC_API_URL_LOCAL: string;

	readonly PAUSE_AUTO_INVOICE_REMINDERS?: boolean;

	// Prisma
	readonly DATABASE_URL: string;

	// Auth0
	readonly AUTH0_CLIENT_SECRET: string;

	// Stripe
	readonly STRIPE_API_KEY: string;
	readonly STRIPE_PAUSE_USAGE_REPORTS?: boolean;
	readonly STRIPE_USAGE_REPORT_CRON?: string | undefined;
	/** The id of the *active* tier plan from the `pricing.json`.
	 * Can either be a general plan: `plan:perunit@0`
	 * Or a specific feature: `feature:unit@plan:perunit@0`
	 *
	 * *Literal Type is taken from tier sdk library.*
	 */
	readonly PUBLIC_TIER_PLAN_ID_1: Feature;
	/** A flag to enable/disable the paywall. Used to disable the paywall in
	 * development and staging environments. */
	readonly PUBLIC_IS_PAYWALL_ACTIVE: boolean;

	// Logtail
	readonly LOGTAIL_TOKEN?: string | undefined;

	// Postmark
	readonly POSTMARK_TOKEN: string;

	// Novu
	readonly NOVU_TOKEN: string;

	// Myfatoorah
	/** Myfatoorah's API URL */
	readonly MYFATOORAH_URL: string;
	readonly MYFATOORAH_KEY: string;
	/** Myfatoorah's frontend URL. Used to view invoices.
	 * ex. `https://demo.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=100202303436098464`
	 * */
	readonly PUBLIC_MYFATOORAH_SITE_URL: string;

	// R2
	readonly R2_ENDPOINT: string;
	readonly R2_ACCESS_KEY_ID: string;
	readonly R2_SECRET_ACCESS_KEY: string;

	// Sentry
	/**
	 * Master toggle for enabling/disabling sentry.
	 * True by default. Set to `0` to disable.
	 */
	readonly PUBLIC_AQ_ENABLE_SENTRY: boolean;
	readonly PUBLIC_TRACE_RATE: number;

	// Optional: https://github.com/colinhacks/zod/issues/980#issuecomment-1055823443
	readonly PUBLIC_COMMIT_SHA?: string | undefined;

	// Debug
	readonly PUBLIC_AQ_DEBUG_LEVEL:
		| 'error'
		| 'warn'
		| 'info'
		| 'http'
		| 'verbose'
		| 'debug'
		| 'silly';

	readonly PUBLIC_AQ_DEBUG_SENTRY: boolean;

	// Sveltekit adapter-node

	/** Docs: https://github.com/sveltejs/kit/tree/master/packages/adapter-node#body_size_limit */
	readonly ORIGIN: string;

	// Allow larger uploads. Defaults to 512kb.
	// Docs: https://github.com/sveltejs/kit/tree/master/packages/adapter-node#body_size_limit
	// GOTCHA: The limit (and any overrides) are only in effect when running app with node build/index.js.
	// Running app with `vite dev/preview` has no limit.
	readonly BODY_SIZE_LIMIT: number;

	// External
	readonly CI?: boolean | undefined;
}

/**
 * Unverified env type
 */
export type UnverfiedAqaratechEnv = {
	readonly [K in keyof AqaratechEnv]: string | undefined;
};
