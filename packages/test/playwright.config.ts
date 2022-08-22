import { devices, type PlaywrightTestConfig } from "@playwright/test";
import { config as dotenv } from "dotenv";

dotenv({
	path: "../../.env",
	debug: true,
});

const config: PlaywrightTestConfig = {
	globalSetup: require.resolve("./global-setup"),
	reporter: [["list"], ["html", { open: "on-failure" }]],
	retries: 2,
	use: {
		storageState: "storageState.json",
		headless: true,
		ignoreHTTPSErrors: true,
		video: "on-first-retry",
		// baseURL: "http://localhost:3000/",
		// baseURL: "https://site.localhost",
		baseURL: process.env.PUBLIC_SITE_URL,
		viewport: { width: 1920, height: 1080 },
		trace: {
			mode: "on",
			screenshots: true,
			snapshots: true,
			sources: true,
		},
	},
	webServer: [
		{
			cwd: "../../packages/backend",
			command: "pnpm run dev",
			port: 3002,
			reuseExistingServer: !process.env.CI,
		},
		{
			cwd: "../../packages/site",
			command: "pnpm run dev",
			port: 3000,
			reuseExistingServer: !process.env.CI,
		},
	],
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				launchOptions: {
					args: ["--window-position=0,0"],
				},
			},
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
			testIgnore: ["**/api/**"],
		},
		{
			name: "pixel5",
			use: { ...devices["Pixel 5"] },
			retries: 2,
			testIgnore: ["**/api/**"],
		},
		{
			name: "iphone",
			use: { ...devices["iPhone 11"] },
			retries: 2,
			testIgnore: ["**/api/**"],
		},
	],
};
export default config;
