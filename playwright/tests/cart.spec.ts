import { test, expect } from '../fixtures/test-fixtures'
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

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
        await expect(cartPage.cartProductQuantity).toBeVisible();
        await expect(cartPage.cartProductTotalPriceText).toBeVisible();

        await cartPage.setCartID(2);
        await expect(cartPage.cartProductPrice).toBeVisible();
        await expect(cartPage.cartProductQuantity).toBeVisible();
        await expect(cartPage.cartProductTotalPriceText).toBeVisible();
    })
    test('verify product quantity in cart', async ({ cartPage, homePage, productDetailsPage }) => {
        await cartPage.goto('/');
        await homePage.homeViewProduct.click();
        await productDetailsPage.productDetailsQuantity.fill('3');
        await productDetailsPage.productDetailsAddToCart.click();
        await productDetailsPage.productDetailsConfirmItemAdded.click();
        await homePage.cartPageNavButton.click();
        await expect(cartPage.cartProductQuantityButton).toHaveText('3');
    })

    test.describe('checkout', async () => {
        test('register and complete checkout', async ({ page, productsPage, homePage, cartPage, randomUser, registrationPage, loginPage, accountCreatedPage, checkoutPage }) => {
            await page.goto('/');
            await productsPage.addProductToCart(1);
            await homePage.cartPageNavButton.click();
            await expect(page).toHaveURL('/view_cart');
            await cartPage.cartCheckoutButton.click();
            await cartPage.cartCheckoutRegistration.click();
            await randomUser.createNewUserByGoingToSignupPage(registrationPage, loginPage);
            await accountCreatedPage.accountCreatedContinueButton.click();
            await expect(homePage.displayName).toBeVisible();
            await homePage.cartPageNavButton.click();
            await cartPage.cartCheckoutButton.click();
            await expect(checkoutPage.checkoutPageName).toHaveText(`. ${randomUser.firstName} ${randomUser.lastName}`);
            await expect(checkoutPage.checkoutPageAddress).toHaveText(`${randomUser.address}`);
            await expect(checkoutPage.checkoutPageCityStateZip).toHaveText(`${randomUser.city} ${randomUser.state} ${randomUser.zipCode}`);
            //toHaveText() returning Promise { <pending> }, TODO verify country text
            //await expect(checkoutPage.checkoutPageCountry).toHaveText('India');
            await expect(checkoutPage.checkoutPagePhoneNumber).toHaveText(`${randomUser.phoneNumber}`);
        })
    })

})