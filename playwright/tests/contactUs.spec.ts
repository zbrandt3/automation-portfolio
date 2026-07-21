import { test, expect } from '../fixtures/test-fixtures';



test.describe('check contact us page functionality', async () => {
    test('submit contact us form', async ({ contactUsPage, page, randomUser, homePage }) => {
        await contactUsPage.goto('/');
        await homePage.contactUsPageNavButton.click();
        await expect(page).toHaveURL('/contact_us');
        await expect(contactUsPage.getInTouchText).toBeVisible();
        await contactUsPage.contactUsName.fill(randomUser.name);
        await contactUsPage.contactUsEmail.fill(randomUser.email);
        await contactUsPage.contactUsSubject.fill("Test");
        await contactUsPage.contactUsMessage.fill("Test");

        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await contactUsPage.contactUsSubmit.click();
        await expect(contactUsPage.contactUsSuccess).toBeVisible({ timeout: 10000 });
    })
})