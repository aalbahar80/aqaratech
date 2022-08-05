import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
	globalSetup: require.resolve("./global-setup"),
	use: {
		storageState: "storageState.json",
		headless: false,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: "on-first-retry",
		baseURL: "http://localhost:3000/",
	},
};
export default config;
