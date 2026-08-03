import {BrowserContext, expect, Page} from '@playwright/test';
import Cookie from 'js-cookie';
import {OrejimeInstance} from '../src/setup';
import {Config} from '../src/ui/types';

declare global {
	interface Window {
		orejimeConfig: Partial<Config>;
		orejime: OrejimeInstance;
	}
}

type Rect = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>;

export class OrejimePage {
	constructor(
		public readonly page: Page,
		public readonly context: BrowserContext
	) {}

	async load(config: Partial<Config>, body: string) {
		await this.page.route('/', async (route) => {
			await route.fulfill({
				body: `
					<!DOCTYPE html>

					<html>
						<head>
							<title>Orejime</title>
							<link rel="stylesheet" href="orejime-standard.css" />
						</head>

						<body>
							${body}

							<script>
								window.orejimeConfig = ${JSON.stringify(config)}
							</script>
							<script src="orejime-standard-en.js"></script>
						</body>
					</html>
				`
			});
		});

		await this.page.goto('/');
	}

	get banner() {
		return this.page.getByTestId('orejime-banner');
	}

	get learnMoreBannerButton() {
		return this.page.getByTestId('orejime-banner-configure');
	}

	get firstFocusableElementFromBanner() {
		return this.banner.locator(':is(a, button)').first();
	}

	get modal() {
		return this.page.getByTestId('orejime-modal');
	}

	get closeModalButton() {
		return this.page.getByTestId('orejime-modal-close');
	}

	get contextualNotice() {
		return this.page.getByTestId('orejime-contextual-notice');
	}

	get contextualNoticeTitle() {
		return this.page.getByTestId('orejime-contextual-notice-title');
	}

	get contextualNoticePlaceholder() {
		return this.page.getByTestId('orejime-contextual-notice-placeholder');
	}

	locator(selector: string) {
		return this.page.locator(selector);
	}

	purposeCheckbox(purposeId: string) {
		return this.page.getByTestId(`orejime-purpose-${purposeId}`);
	}

	async acceptAllFromBanner() {
		await this.page.getByTestId('orejime-banner-accept').click();
	}

	async declineAllFromBanner() {
		await this.page.getByTestId('orejime-banner-decline').click();
	}

	async acceptAllFromManager() {
		return await this.page.evaluate(() => {
			window.orejime.manager.acceptAll();
		});
	}

	async openModalFromBanner() {
		await this.learnMoreBannerButton.click();
	}

	async enableAllFromModal() {
		await this.page.getByTestId('orejime-modal-enable-all').click();
	}

	async disableAllFromModal() {
		await this.page.getByTestId('orejime-modal-disable-all').click();
	}

	async saveFromModal() {
		await this.page.getByTestId('orejime-modal-save').click();
	}

	async closeModalByClickingButton() {
		await this.closeModalButton.click();
	}

	async closeDialogByClickingOutside() {
		// We're clicking in a corner to avoid clicking on the
		// modal itself, which has no effect.
		await this.locator('body').click({
			position: {
				x: 1,
				y: 1
			}
		});
	}

	async cancelClosingDialogByReleasingClickInside() {
		await this.locator('body').hover({
			position: {
				x: 1,
				y: 1
			}
		});

		await this.page.mouse.down();
		await this.modal.hover();
		await this.page.mouse.up();
	}

	async closeModalByPressingEscape() {
		await this.page.keyboard.press('Escape');
	}

	async acceptContextualNotice() {
		await this.page.getByTestId('orejime-contextual-notice-accept').click();
	}

	// @see https://github.com/boscop-fr/orejime/issues/170
	async focusOnDocument() {
		return this.page.evaluate(() => {
			document.dispatchEvent(new FocusEvent('focusin'));
		});
	}

	async getBannerRect() {
		const position = await this.banner.boundingBox();

		if (!position) {
			throw new Error('Unable to get banner position');
		}

		return position as Rect;
	}

	async expectBannerRect(expected: Rect) {
		await expect(await this.getBannerRect()).toEqual(expected);
	}

	async expectDifferentBannerRect(expected: Rect) {
		await expect(await this.getBannerRect()).not.toEqual(expected);
	}

	async expectUndefinedConsents() {
		await expect(await this.getConsentsFromCookies()).toBeUndefined();
	}

	async expectAnyConsents() {
		await expect(await this.getConsentsFromCookies()).not.toBeUndefined();
	}

	async expectConsents(consents: Record<string, unknown>) {
		await expect(await this.getConsentsFromCookies()).toEqual(consents);
	}

	async getConsentsFromCookies() {
		const name = 'eu-consent';
		const cookies = await this.context.cookies();
		const cookie = cookies.find((cookie) => cookie.name === name)!;

		if (!cookie) {
			return undefined;
		}

		return JSON.parse(Cookie.converter.read(cookie.value, cookie.name));
	}

	async clearConsents() {
		return await this.page.evaluate(() => {
			window.orejime.manager.clearConsents();
		});
	}

	// In specific conditions, browser events can get queued
	// up and won't be fired until some interaction with the
	// page.
	// We're using a dummy click to trigger queued events.
	// @see https://github.com/microsoft/playwright/issues/979
	emptyEventQueue() {
		return this.page.mouse.click(0, 0);
	}
}
