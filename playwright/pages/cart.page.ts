import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page';
import { ProductsPage } from './products.page';
import { HomePage } from './home.page';
import { BaseUser } from '../utils/test-users';
import { RegistrationPage } from './registration.page';
import { LoginPage } from './login.page';
import { AccountCreatedPage } from './accountCreated.page';
import { CheckoutPage } from './checkout.page';
import { PaymentDetailsPage } from './paymentDetails.page';

export class CartPage extends BasePage {
    //TODO: change to Promise<number> when getProductTotalPrice() is finished
    public cartProductTotalPrice: number;
    protected cartId = 1;

    readonly cartSubscriptionHeader: Locator;
    readonly cartSubscriptionForm: Locator;
    readonly cartSubscriptionSubmitButton: Locator;
    readonly cartSubscriptionSuccessMessage: Locator;
    readonly cartProductTableRows: Locator;
    readonly cartProduct: Locator;
    readonly cartProductPrice: Locator;
    readonly cartProductQuantity: Locator;
    readonly cartProductQuantityButton: Locator;
    readonly cartProductTotalPriceText: Locator;
    readonly cartCheckoutButton: Locator;
    readonly cartCheckoutRegistration: Locator;

    constructor(page: Page) {
        super(page);
        this.cartSubscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.cartSubscriptionForm = page.locator('#susbscribe_email');
        this.cartSubscriptionSubmitButton = page.locator('#subscribe');
        this.cartSubscriptionSuccessMessage = page.locator('#success-subscribe');
        this.cartProductTableRows = page.locator('#cart_info_table tbody tr');
        this.cartProduct = page.locator('.class_product').nth(this.cartId - 1);
        this.cartProductQuantity = page.locator('.cart_quantity').nth(this.cartId - 1);
        this.cartProductQuantityButton = page.locator('.cart_quantity button');
        this.cartProductPrice = page.locator('.cart_price').nth(this.cartId - 1);
        this.cartProductTotalPriceText = page.locator('.cart_total_price').nth(this.cartId - 1);
        this.cartProductTotalPrice = 0;

        this.cartCheckoutButton = page.getByText('Proceed To Checkout');
        this.cartCheckoutRegistration = page.getByRole('link', { name: 'Register / Login' });
    }

    async setCartID(id: number) {
        this.cartId = id;
    }

    //placeholder code to get full price of multiple of an item on cart
    async getProductTotalPrice(): Promise<number> {
        const priceText = this.cartProductPrice.innerText();
        return parseFloat((await priceText).replace('Rs. ', ''));
    }

    async checkoutCart(registered: Boolean, page: Page, productsPage: ProductsPage, homePage: HomePage, randomUser: BaseUser, registrationPage: RegistrationPage, loginPage: LoginPage, accountCreatedPage: AccountCreatedPage, checkoutPage: CheckoutPage, paymentDetailsPage: PaymentDetailsPage) {
        if (!registered) {
            await page.goto('/');
            await productsPage.addProductToCart(1);
            await homePage.cartPageNavButton.click();
            await expect(page).toHaveURL('/view_cart');
            await this.cartCheckoutButton.click();
            await this.cartCheckoutRegistration.click();
            await randomUser.createNewUserByGoingToSignupPage(registrationPage, loginPage);
            await accountCreatedPage.accountCreatedContinueButton.click();
            await expect(homePage.displayName).toBeVisible();
            await homePage.cartPageNavButton.click();
            await this.cartCheckoutButton.click();
            await expect(checkoutPage.checkoutPageName).toHaveText(`. ${randomUser.firstName} ${randomUser.lastName}`);
            await expect(checkoutPage.checkoutPageAddress).toHaveText(`${randomUser.address}`);
            await expect(checkoutPage.checkoutPageCityStateZip).toHaveText(`${randomUser.city} ${randomUser.state} ${randomUser.zipCode}`);
            await expect(checkoutPage.checkoutPageCountry).toHaveText('United States');
            await expect(checkoutPage.checkoutPagePhoneNumber).toHaveText(`${randomUser.phoneNumber}`);
            await checkoutPage.checkoutPageDescription.fill('x');
            await checkoutPage.checkoutOutPagePlaceOrder.click();
            await paymentDetailsPage.paymentDetailsPageCardName.fill(randomUser.name);
            await paymentDetailsPage.paymentDetailsPageCardNumber.fill(randomUser.cardNumber);
            await paymentDetailsPage.paymentDetailsPageCVC.fill(randomUser.cvc);
            await paymentDetailsPage.paymentDetailsPageExpirationMonth.fill(randomUser.cardExpirationMonth);
            await paymentDetailsPage.paymentDetailsPageExpirationYear.fill(randomUser.cardExpirationYear);
            await paymentDetailsPage.paymentDetailsPageConfirmOrderButton.click();
            await expect(page).toHaveURL(/payment_done/);
            await homePage.deleteAccountButton.click();
            await expect(page).toHaveURL('/delete_account');
        }
        else {
            await page.goto('/');
            await randomUser.createNewUserByGoingToSignupPage(registrationPage, loginPage);
            await productsPage.addProductToCart(1);
            await homePage.cartPageNavButton.click();
            await expect(page).toHaveURL('/view_cart');
            await this.cartCheckoutButton.click();
            await expect(checkoutPage.checkoutPageName).toHaveText(`. ${randomUser.firstName} ${randomUser.lastName}`);
            await expect(checkoutPage.checkoutPageAddress).toHaveText(`${randomUser.address}`);
            await expect(checkoutPage.checkoutPageCityStateZip).toHaveText(`${randomUser.city} ${randomUser.state} ${randomUser.zipCode}`);
            await expect(checkoutPage.checkoutPageCountry).toHaveText('United States');
            await expect(checkoutPage.checkoutPagePhoneNumber).toHaveText(`${randomUser.phoneNumber}`);
            await checkoutPage.checkoutPageDescription.fill('x');
            await checkoutPage.checkoutOutPagePlaceOrder.click();
            await paymentDetailsPage.paymentDetailsPageCardName.fill(randomUser.name);
            await paymentDetailsPage.paymentDetailsPageCardNumber.fill(randomUser.cardNumber);
            await paymentDetailsPage.paymentDetailsPageCVC.fill(randomUser.cvc);
            await paymentDetailsPage.paymentDetailsPageExpirationMonth.fill(randomUser.cardExpirationMonth);
            await paymentDetailsPage.paymentDetailsPageExpirationYear.fill(randomUser.cardExpirationYear);
            await paymentDetailsPage.paymentDetailsPageConfirmOrderButton.click();
            await expect(page).toHaveURL(/payment_done/);
            await homePage.deleteAccountButton.click();
            await expect(page).toHaveURL('/delete_account');
        }
    }
}