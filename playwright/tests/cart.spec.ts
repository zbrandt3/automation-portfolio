import { test, expect } from '../fixtures/test-fixtures'
import { existingUser1 } from '../utils/test-users';

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
    test('remove product from cart', async ({ cartPage, homePage, productsPage }) => {
        await cartPage.goto('/');
        await productsPage.addProductToCart(1);
        await productsPage.addProductToCart(2);
        await cartPage.setCartID(1);
        await homePage.cartPageNavButton.click();
        await expect(cartPage.cartProductTableRows).toHaveCount(2);
        await cartPage.cartRemoveItemButton.click();
        await expect(cartPage.cartProductTableRows).toHaveCount(1);
    })

    test.describe('checkout', async () => {
        test('register while checkout', async ({ page, productsPage, homePage, cartPage, randomUserNoCleanup, registrationPage, loginPage, accountCreatedPage, checkoutPage, paymentDetailsPage }) => {
            await cartPage.checkoutCart(
                false,
                page,
                productsPage,
                homePage,
                randomUserNoCleanup,
                registrationPage,
                loginPage,
                accountCreatedPage,
                checkoutPage,
                paymentDetailsPage
            );
        })
        test('register before checkout', async ({ page, productsPage, homePage, cartPage, randomUserNoCleanup, registrationPage, loginPage, accountCreatedPage, checkoutPage, paymentDetailsPage }) => {
            await cartPage.checkoutCart(
                true,
                page,
                productsPage,
                homePage,
                randomUserNoCleanup,
                registrationPage,
                loginPage,
                accountCreatedPage,
                checkoutPage,
                paymentDetailsPage
            );
        })
        test('existing account checkout', async ({ page, registeredUser, homePage, productsPage, cartPage, checkoutPage, paymentDetailsPage }) => {
            await page.goto('/');
            await expect(homePage.displayName).toHaveText(registeredUser.name);
            await productsPage.addProductToCart(1);
            await homePage.cartPageNavButton.click();
            await expect(page).toHaveURL('/view_cart');
            await cartPage.cartCheckoutButton.click();
            await expect(checkoutPage.checkoutPageName).toHaveText(`. ${registeredUser.firstName} ${registeredUser.lastName}`);
            await expect(checkoutPage.checkoutPageAddress).toHaveText(`${registeredUser.address}`);
            await expect(checkoutPage.checkoutPageCityStateZip).toHaveText(`${registeredUser.city} ${registeredUser.state} ${registeredUser.zipCode}`);
            await expect(checkoutPage.checkoutPageCountry).toHaveText(registeredUser.country);
            await expect(checkoutPage.checkoutPagePhoneNumber).toHaveText(`${registeredUser.phoneNumber}`);
            await checkoutPage.checkoutPageDescription.fill('x');
            await checkoutPage.checkoutOutPagePlaceOrder.click();
            await paymentDetailsPage.paymentDetailsPageCardName.fill(registeredUser.name);
            await paymentDetailsPage.paymentDetailsPageCardNumber.fill(registeredUser.cardNumber);
            await paymentDetailsPage.paymentDetailsPageCVC.fill(registeredUser.cvc);
            await paymentDetailsPage.paymentDetailsPageExpirationMonth.fill(registeredUser.cardExpirationMonth);
            await paymentDetailsPage.paymentDetailsPageExpirationYear.fill(registeredUser.cardExpirationYear);
            await paymentDetailsPage.paymentDetailsPageConfirmOrderButton.click();
            await expect(page).toHaveURL(/payment_done/);
        })
    })
})
