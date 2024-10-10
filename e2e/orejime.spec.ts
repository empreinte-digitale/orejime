import {test, expect, type BrowserContext} from '@playwright/test';

test.describe('Orejime', () => {
	const getConsentsFromCookies = async (context: BrowserContext) => {
		const cookies = await context.cookies();
		const orejimeCookie = cookies.find(({name}) => name === 'eu-consent');

		// `js-cookie` encodes cookie values
		const decodedValue = orejimeCookie!.value
			.replace(/%22/gi, '"')
			.replace(/%2C/gi, ',');

		return JSON.parse(decodedValue);
	};

	test.beforeEach(async ({page}) => {
		await page.goto('/');
	});

	test('should show a notice', async ({page}) => {
		const notice = page.locator('.orejime-Banner');
		await expect(notice).toBeVisible();
	});

	test('should navigate to the notice first', async ({page}) => {
		await page.keyboard.press('Tab');
		const firstButton = page.locator('.orejime-Banner-saveButton');
		await expect(firstButton).toBeVisible();
	});

	test('should accept all purposes from the notice', async ({
		page,
		context
	}) => {
		await page.locator('.orejime-Banner-saveButton').click();
		const notice = page.locator('.orejime-Banner');
		await expect(notice).not.toBeVisible();

		const consents = await getConsentsFromCookies(context);

		expect(consents).toEqual(
			expect.objectContaining({
				'mandatory': true,
				'inline-tracker': true,
				'external-tracker': true
			})
		);
	});

	test('should decline all purposes from the notice', async ({
		page,
		context
	}) => {
		await page.locator('.orejime-Banner-declineButton').click();
		const notice = page.locator('.orejime-Banner');
		await expect(notice).not.toBeVisible();

		const consents = await getConsentsFromCookies(context);

		expect(consents).toEqual(
			expect.objectContaining({
				'mandatory': true,
				'inline-tracker': false,
				'external-tracker': false
			})
		);
	});

	test('should open a modal', async ({page}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();
		const notice = page.locator('.orejime-Banner');
		await expect(notice).toBeVisible();

		const modal = page.locator('.orejime-Modal');
		await expect(modal).toBeVisible();
		await expect(notice).toBeVisible();
	});

	test('should close the modal via the close button', async ({page}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();
		const modal = page.locator('.orejime-Modal');
		await expect(modal).toBeVisible();

		await page.locator('.orejime-Modal-closeButton').click();
		await expect(modal).toHaveCount(0);

		const notice = page.locator('.orejime-Banner');
		await expect(notice).toBeVisible();
	});

	test('should close the modal via the overlay', async ({page}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();
		const modal = page.locator('.orejime-Modal');
		await expect(modal).toBeVisible();

		// We're clicking in a corner to avoid clicking on the
		// modal itself, which has no effect.
		await page.locator('.orejime-ModalOverlay').click({
			position: {
				x: 1,
				y: 1
			}
		});

		await expect(modal).toHaveCount(0);

		const notice = page.locator('.orejime-Banner');
		await expect(notice).toBeVisible();
	});

	test('should close the modal via `Escape` key', async ({page}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();
		const modal = page.locator('.orejime-Modal');
		await expect(modal).toBeVisible();

		await page.keyboard.press('Escape');
		await expect(modal).toHaveCount(0);

		const notice = page.locator('.orejime-Banner');
		await expect(notice).toBeVisible();
	});

	test('should move focus after closing the modal', async ({page}) => {
		const openModalButton = page.locator('.orejime-Banner-learnMoreButton');
		openModalButton.click();

		const modal = page.locator('.orejime-Modal');
		await expect(modal).toBeVisible();

		await page.keyboard.press('Escape');
		await expect(openModalButton).toBeFocused();
	});

	test('should accept all purposes from the modal', async ({
		page,
		context
	}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();
		await page.locator('.orejime-PurposeToggles-enableAll').click();

		const checkbox = page.locator('#orejime-purpose-inline-tracker');
		await expect(checkbox).toBeChecked();

		const mandatoryCheckbox = page.locator('#orejime-purpose-mandatory');
		await expect(mandatoryCheckbox).toBeChecked();

		await page.locator('.orejime-Modal-saveButton').click();
		const consents = await getConsentsFromCookies(context);

		expect(consents).toEqual(
			expect.objectContaining({
				'mandatory': true,
				'inline-tracker': true,
				'external-tracker': true
			})
		);

		const notice = page.locator('.orejime-Banner');
		await expect(notice).not.toBeVisible();
	});

	test('should decline all purposes from the modal', async ({
		page,
		context
	}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();
		await page.locator('.orejime-PurposeToggles-enableAll').click();
		await page.locator('.orejime-PurposeToggles-disableAll').click();

		const checkbox = page.locator('#orejime-purpose-inline-tracker');
		await expect(checkbox).not.toBeChecked();

		const mandatoryCheckbox = page.locator('#orejime-purpose-mandatory');
		await expect(mandatoryCheckbox).toBeChecked();

		await page.locator('.orejime-Modal-saveButton').click();
		const consents = await getConsentsFromCookies(context);

		expect(consents).toEqual(
			expect.objectContaining({
				'mandatory': true,
				'inline-tracker': false,
				'external-tracker': false
			})
		);

		const notice = page.locator('.orejime-Banner');
		await expect(notice).not.toBeVisible();
	});

	test('should sync grouped purposes', async ({page}) => {
		await page.locator('.orejime-Banner-learnMoreButton').click();

		const checkbox = page.locator('#orejime-purpose-inline-tracker');
		await expect(checkbox).not.toBeChecked();

		const checkbox2 = page.locator('#orejime-purpose-external-tracker');
		await expect(checkbox2).not.toBeChecked();

		const groupCheckbox = page.locator('#orejime-purpose-group');
		await groupCheckbox.check();
		await expect(groupCheckbox).toBeChecked();
		await expect(checkbox).toBeChecked();
		await expect(checkbox2).toBeChecked();

		await checkbox.uncheck();
		await expect(groupCheckbox).not.toBeChecked();
		await expect(groupCheckbox).toHaveJSProperty('indeterminate', true);
		await expect(checkbox).not.toBeChecked();
		await expect(checkbox2).toBeChecked();

		await checkbox2.uncheck();
		await expect(groupCheckbox).not.toBeChecked();
		await expect(checkbox).not.toBeChecked();
		await expect(checkbox2).not.toBeChecked();
	});
});
