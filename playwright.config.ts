import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://127.0.0.1:3000',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: {...devices['Desktop Chrome']}
		},
		{
			name: 'firefox',
			use: {...devices['Desktop Firefox']}
		}
	],
	webServer: {
		command: 'npm run serve',
		url: 'http://127.0.0.1:3000',
		reuseExistingServer: !process.env.CI
	}
});
