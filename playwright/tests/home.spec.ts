import {test, expect} from '../fixtures/test-fixtures'

test.describe('Home page', () => {
    test('Subscribe email', async ({ homePage }) => {
        await homePage.goto('/');
        await homePage.subscriptionForm.fill('test@gmail.com');
        await homePage.subscriptionSubmitButton.click();
        await expect(homePage.subscriptionSuccessMessage).toBeVisible();
})
})