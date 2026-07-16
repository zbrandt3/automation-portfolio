import { test, expect } from '../fixtures/test-fixtures';

test.describe('check homepage functionality', async () => {
    test('confirm contact us button', async ({ homePage, page, randomUser }) => {
        await homePage.goto('/');
        await homePage.contactUsButton.click();
        await expect(page).toHaveURL('/contact_us');
        await expect(homePage.getInTouchText).toBeVisible();
        await homePage.contactUsName.fill(randomUser.name);
        await homePage.contactUsEmail.fill(randomUser.email);
        await homePage.contactUsSubject.fill("Test");
        await homePage.contactUsMessage.fill("Test");

        await page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            await dialog.accept();
        })
        await homePage.contactUsSubmit.click();
        await expect(homePage.contactUsSuccess).toBeVisible({ timeout: 30000 });
    })
})