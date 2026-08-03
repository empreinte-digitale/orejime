import {test, expect} from '@playwright/test';
import {OrejimePage} from './OrejimePage';

test.describe('Orejime', () => {
	let orejimePage: OrejimePage;

	test.beforeEach(async ({page, context}) => {
		orejimePage = new OrejimePage(page, context);
		await orejimePage.load(
			{
				privacyPolicyUrl: 'https://example.org/privacy',
				purposes: [
					{
						id: 'mandatory',
						title: 'Mandatory',
						cookies: ['mandatory'],
						isMandatory: true
					},
					{
						id: 'group',
						title: 'Group',
						purposes: [
							{
								id: 'contextual',
								title: 'Contextual',
								cookies: ['contextual']
							},
							{
								id: 'other',
								title: 'Other',
								cookies: ['other']
							}
						]
					}
				]
			},
			`
				<template data-purpose="contextual" data-contextual data-title-level="2">
					<iframe id="contextual" src=""></iframe>
				</template>

				<template data-purpose="mandatory">
					<script id="mandatory"></script>
				</template>

				<button
					id="obscuring"
					style="position: absolute; bottom: 6rem; right: 3rem; z-index: 9999;"
				>
					Obscuring
				</button>

				<button
					id="obscured"
					style="position: absolute; bottom: 3rem; right: 3rem;"
				>
					Obscured
				</button>

				<button
					id="non-obscured"
					style="position: absolute; bottom: 3rem; left: 3rem;"
				>
					Non obscured
				</button>
			`
		);
	});

	test('should show a banner', async () => {
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should navigate to the banner first', async () => {
		await expect(orejimePage.firstFocusableElementFromBanner).toBeFocused();
	});

	test('should accept all purposes from the banner', async () => {
		await orejimePage.acceptAllFromBanner();
		await expect(orejimePage.banner).not.toBeVisible();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': true,
			'other': true
		});

		await expect(orejimePage.locator('#mandatory')).toBeAttached();
		await expect(orejimePage.locator('#contextual')).toBeVisible();
	});

	test('should decline all purposes from the banner', async () => {
		await orejimePage.declineAllFromBanner();
		await expect(orejimePage.banner).not.toBeVisible();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': false,
			'other': false
		});

		await expect(orejimePage.locator('#mandatory')).toBeAttached();
		await expect(orejimePage.locator('#contextual')).not.toBeAttached();
	});

	test('should open a modal', async () => {
		await orejimePage.openModalFromBanner();

		await expect(orejimePage.banner).toBeVisible();
		await expect(orejimePage.modal).toBeVisible();
	});

	test('should close the modal via the close button', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByClickingButton();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should close the modal via the overlay', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeDialogByClickingOutside();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should not close the modal via the overlay when cancelling the click', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.cancelClosingDialogByReleasingClickInside();
		await expect(orejimePage.modal).toBeVisible();
	});

	test('should close the modal via `Escape` key', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByPressingEscape();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should move focus after closing the modal', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByPressingEscape();
		await expect(orejimePage.learnMoreBannerButton).toBeFocused();
	});

	test('should accept all purposes from the modal', async () => {
		await orejimePage.openModalFromBanner();
		await orejimePage.enableAllFromModal();
		await expect(orejimePage.purposeCheckbox('contextual')).toBeChecked();
		await expect(orejimePage.purposeCheckbox('mandatory')).toBeChecked();
		await orejimePage.saveFromModal();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': true,
			'other': true
		});
	});

	test('should decline all purposes from the modal', async () => {
		await orejimePage.openModalFromBanner();
		await orejimePage.enableAllFromModal();
		await orejimePage.disableAllFromModal();
		await expect(orejimePage.purposeCheckbox('contextual')).not.toBeChecked();
		await expect(orejimePage.purposeCheckbox('mandatory')).toBeChecked();
		await orejimePage.saveFromModal();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': false,
			'other': false
		});
	});

	test('should sync grouped purposes', async () => {
		await orejimePage.openModalFromBanner();

		const checkbox = orejimePage.purposeCheckbox('contextual');
		await expect(checkbox).not.toBeChecked();

		const checkbox2 = orejimePage.purposeCheckbox('other');
		await expect(checkbox2).not.toBeChecked();

		const groupCheckbox = orejimePage.purposeCheckbox('group');
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

	test('should show a contextual consent notice', async () => {
		await expect(orejimePage.contextualNotice).toBeAttached();
	});

	test('should use a custom heading level in the contextual consent notice', async () => {
		await expect(orejimePage.contextualNoticeTitle).toHaveJSProperty(
			'nodeName',
			'H2'
		);
	});

	test('should accept contextual consent from the notice', async () => {
		await orejimePage.acceptContextualNotice();
		await expect(orejimePage.locator('#contextual')).toBeVisible();
		await expect(orejimePage.contextualNotice).not.toBeVisible();
		await expect(orejimePage.contextualNoticePlaceholder).toBeAttached();

		await orejimePage.contextualNoticePlaceholder.press('Tab');
		await expect(orejimePage.locator('#contextual')).toBeFocused();

		// This fixes an issue on Firefox, where `focusout`
		// events wouldn't be fired as soon as they should be.
		// The contextual notice relies on those events to
		// remove placeholder elements from the page.
		// This bug is only related to Playwright and does
		// not happen in the browser alone.
		await orejimePage.emptyEventQueue();

		await expect(orejimePage.contextualNoticePlaceholder).not.toBeAttached();
	});

	test('should accept contextual consent from the banner', async () => {
		await orejimePage.acceptAllFromBanner();
		await expect(orejimePage.locator('#contextual')).toBeVisible();
		await expect(orejimePage.contextualNotice).not.toBeVisible();
		await expect(orejimePage.contextualNoticePlaceholder).not.toBeAttached();
	});

	test('should not obscure any focused element (WCAG 2.4.12)', async () => {
		const initalRect = await orejimePage.getBannerRect();
		const obscured = orejimePage.locator('#obscured');

		// The button should be obscured by the banner at
		// this stage, thus not being able to receive click
		// events.
		await expect(
			obscured.click({
				timeout: 10
			})
		).rejects.toThrow();

		// When the obscured button takes focus, the banner
		// should be moved so it becomes visible/usable.
		await obscured.focus();
		await obscured.click();
		await orejimePage.expectDifferentBannerRect(initalRect);

		// When a non obscured button takes focus, the banner
		// shouldn't be displaced.
		const nonObscured = orejimePage.locator('#non-obscured');
		await nonObscured.focus();
		await nonObscured.click();
		await orejimePage.expectBannerRect(initalRect);

		// When a button above the banner takes focus, the
		// banner shouldn't be displaced either.
		const obscuring = orejimePage.locator('#obscuring');
		await obscuring.focus();
		await orejimePage.expectBannerRect(initalRect);

		// Collision detection is based on focus event targets.
		// Sometimes, those targets aren't DOM elements.
		// This should not break the resolution but move the
		// banner to its default position.
		await orejimePage.focusOnDocument();
		await orejimePage.expectBannerRect(initalRect);
	});

	test('should clear consents', async () => {
		await orejimePage.expectUndefinedConsents();
		await orejimePage.acceptAllFromManager();
		await orejimePage.expectAnyConsents();
		await orejimePage.clearConsents();
		await orejimePage.expectUndefinedConsents();
	});
});

test.describe('Orejime with forced banner', () => {
	test('should prevent navigation before consent', async ({page, context}) => {
		const orejimePage = new OrejimePage(page, context);
		await orejimePage.load(
			{
				forceBanner: true,
				privacyPolicyUrl: 'https://example.org/privacy',
				purposes: [
					{
						id: 'foo',
						title: '',
						cookies: []
					}
				]
			},
			`
				<button id="button">Button</button>
			`
		);

		await expect(orejimePage.banner).toBeVisible();

		// The banner shouldn't be closable.
		await orejimePage.closeDialogByClickingOutside();
		await expect(orejimePage.banner).toBeVisible();

		const button = await orejimePage.locator('#button');

		// Focus should never escape the banner.
		for (let i = 0; i < 10; i++) {
			await orejimePage.locator(':focus').press('Tab');
			await expect(button).not.toBeFocused();
		}

		await orejimePage.acceptAllFromBanner();
		await expect(orejimePage.banner).not.toBeAttached();
	});
});

test.describe('Orejime with forced modal', () => {
	test('should prevent navigation before consent', async ({page, context}) => {
		const orejimePage = new OrejimePage(page, context);
		await orejimePage.load(
			{
				forceModal: true,
				privacyPolicyUrl: 'https://example.org/privacy',
				purposes: [
					{
						id: 'foo',
						title: '',
						cookies: []
					}
				]
			},
			`
				<button id="button">Button</button>
			`
		);

		await expect(orejimePage.modal).toBeVisible();

		// The modal shouldn't be closable.
		await orejimePage.closeDialogByClickingOutside();
		await expect(orejimePage.modal).toBeVisible();
		await expect(orejimePage.closeModalButton).not.toBeAttached();

		// The banner shouldn't be visible.
		await expect(orejimePage.banner).not.toBeAttached();

		const button = await orejimePage.locator('#button');

		// Focus should never escape the modal.
		for (let i = 0; i < 10; i++) {
			await orejimePage.locator(':focus').press('Tab');
			await expect(button).not.toBeFocused();
		}

		await orejimePage.saveFromModal();
		await expect(orejimePage.modal).not.toBeAttached();
	});
});
