import {test, expect} from '@playwright/test';
import {Config} from '../../src/ui';
import {OrejimePage} from './OrejimePage';

test.describe('Orejime', () => {
	const BaseConfig: Partial<Config> = {
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
						id: 'child-1',
						title: 'First child',
						cookies: ['child-1']
					},
					{
						id: 'child-2',
						title: 'Second child',
						cookies: ['child-2']
					}
				]
			}
		]
	};

	let orejimePage: OrejimePage;

	test.beforeEach(async ({page, context}) => {
		orejimePage = new OrejimePage(page, context);
		await orejimePage.load(BaseConfig);
	});

	test('should show a banner', async () => {
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should navigate to the banner first', async () => {
		await orejimePage.focusNext();
		await expect(orejimePage.firstFocusableElementFromBanner).toBeFocused();
	});

	test('should accept all purposes from the banner', async () => {
		await orejimePage.acceptAllFromBanner();
		await expect(orejimePage.banner).not.toBeVisible();

		orejimePage.expectConsents({
			'mandatory': true,
			'child-1': true,
			'child-2': true
		});
	});

	test('should decline all purposes from the banner', async () => {
		await orejimePage.declineAllFromBanner();
		await expect(orejimePage.banner).not.toBeVisible();

		orejimePage.expectConsents({
			'mandatory': true,
			'child-1': false,
			'child-2': false
		});
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

		await orejimePage.closeModalByClickingOutside();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
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
		await expect(orejimePage.leanMoreBannerButton).toBeFocused();
	});

	test('should accept all purposes from the modal', async () => {
		await orejimePage.openModalFromBanner();
		await orejimePage.enableAllFromModal();
		await expect(orejimePage.purposeCheckbox('child-1')).toBeChecked();
		await expect(orejimePage.purposeCheckbox('mandatory')).toBeChecked();
		await orejimePage.saveFromModal();

		orejimePage.expectConsents({
			'mandatory': true,
			'child-1': true,
			'child-2': true
		});
	});

	test('should decline all purposes from the modal', async () => {
		await orejimePage.openModalFromBanner();
		await orejimePage.enableAllFromModal();
		await orejimePage.disableAllFromModal();
		await expect(orejimePage.purposeCheckbox('child-1')).not.toBeChecked();
		await expect(orejimePage.purposeCheckbox('mandatory')).toBeChecked();
		await orejimePage.saveFromModal();

		orejimePage.expectConsents({
			'mandatory': true,
			'child-1': false,
			'child-2': false
		});
	});

	test('should sync grouped purposes', async () => {
		await orejimePage.openModalFromBanner();

		const checkbox = orejimePage.purposeCheckbox('child-1');
		await expect(checkbox).not.toBeChecked();

		const checkbox2 = orejimePage.purposeCheckbox('child-2');
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
});
