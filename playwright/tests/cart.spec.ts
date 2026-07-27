import { test, expect } from '../fixtures/test-fixtures'

test.describe('Check cart page', () => {
    test('subscribe with email on cart page', async ({ cartPage, homePage }) => {
        await cartPage.goto('/');
        await homePage.cartPageNavButton.click();
        await expect(cartPage.cartSubscriptionHeader).toBeVisible();
        await cartPage.cartSubscriptionForm.fill('test@gmail.com');
        await cartPage.cartSubscriptionSubmitButton.click();
        await expect(cartPage.cartSubscriptionSuccessMessage).toBeVisible
    })
    test('add 2 products to cart', async ({ cartPage, homePage, productsPage }) => {
        await cartPage.goto('/');
        await productsPage.addProductToCart(1);
        await productsPage.addProductToCart(2);
        await homePage.cartPageNavButton.click();
        await expect(cartPage.cartProductTableRows).toHaveCount(2);

        //magic numbers for now while more elegant solution is explored. same with hard coded loop
        await expect(cartPage.cartProductPrice).toBeVisible();
        await expect(cartPage.cartProductQuanity).toBeVisible();
        await expect(cartPage.cartProductTotalPriceText).toBeVisible();

        await cartPage.setCartID(2);
        await expect(cartPage.cartProductPrice).toBeVisible();
        await expect(cartPage.cartProductQuanity).toBeVisible();
        await expect(cartPage.cartProductTotalPriceText).toBeVisible();

    })
})