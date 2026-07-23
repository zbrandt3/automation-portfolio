import { test, expect } from '../fixtures/test-fixtures'

test.describe('Check cart page', () => {
    test('subscribe with email on cart page', async ({ cartPage }) => {
        await cartPage.goto('/');
        await cartPage.goto('view_cart');
        await expect(cartPage.cartSubscriptionHeader).toBeVisible();
        await cartPage.cartSubscriptionForm.fill('test@gmail.com');
        await cartPage.cartSubscriptionSubmitButton.click();
        await expect(cartPage.cartSubscriptionSuccessMessage).toBeVisible
    })
})