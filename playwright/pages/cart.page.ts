import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly cartSubscriptionHeader: Locator;
    readonly cartSubscriptionForm: Locator;
    readonly cartSubscriptionSubmitButton: Locator;
    readonly cartSubscriptionSuccessMessage: Locator;
    readonly cartProductTableRows: Locator;
    readonly cartProduct: Locator;
    /*readonly cartProductPrice: Locator;
    readonly cartProductQuanity: Locator;
    readonly cartTotalPrice: Locator;*/

    constructor(page: Page) {
        super(page);
        this.cartSubscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.cartSubscriptionForm = page.locator('#susbscribe_email');
        this.cartSubscriptionSubmitButton = page.locator('#subscribe');
        this.cartSubscriptionSuccessMessage = page.locator('#success-subscribe');
        this.cartProductTableRows = page.locator('#cart_info_table tbody trow');
        this.cartProduct = page.locator('');
        /*this.cartProductPrice =
            this.cartProductQuanity =
            this.cartTotalPrice =*/
    }
}