import { devices, type PlaywrightTestConfig } from "@playwright/test";
import { config as dotenv } from "dotenv";

dotenv({
	path: "../../.env",
});

const config: PlaywrightTestConfig = {
	globalSetup: require.resolve("./global-setup"),
	reporter: [["list"], ["html", { open: "on-failure" }]],
	retries: 2,
	timeout: 15 * 1000,
	use: {
		storageState: "storageState.json",
		headless: true,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		video: "on-first-retry",
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
			use: { ...devices["Pixel 5"], isMobile: true },
			testIgnore: ["**/api/**"],
		},
		// {
		// 	// requires https
		// 	name: "iphone",
		// 	use: {
		// 		...devices["iPhone 8"],
		// 		isMobile: true,
		// 	},
		// 	testIgnore: ["**/api/**"],
		// },
		// {
		// 	// requires https
		// 	name: "safari",
		// 	use: { ...devices["Desktop Safari"] },
		// 	testIgnore: ["**/api/**"],
		// },
	],
};
export default config;
