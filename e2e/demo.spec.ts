import {test, expect} from '@playwright/test';

test.describe('Demo page', () => {
	// A very basic test to assess the availability of the dev server.
	test('should have a title', async ({page}) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Orejime/);
	});
});
