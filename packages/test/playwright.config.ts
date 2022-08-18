import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
	globalSetup: require.resolve("./global-setup"),
	reporter: [["list"], ["html", { open: "on-failure" }]],
	use: {
		storageState: "storageState.json",
		headless: true,
		ignoreHTTPSErrors: true,
		video: "on-first-retry",
		baseURL: "http://localhost:3000/",
		viewport: { width: 1920, height: 1080 },
		launchOptions: {
			args: ["--window-position=0,0"],
		},
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
};
export default config;
