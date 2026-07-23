import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly cartSubscriptionHeader: Locator;
    readonly cartSubscriptionForm: Locator;
    readonly cartSubscriptionSubmitButton: Locator;
    readonly cartSubscriptionSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.cartSubscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.cartSubscriptionForm = page.locator('#susbscribe_email');
        this.cartSubscriptionSubmitButton = page.locator('#subscribe');
        this.cartSubscriptionSuccessMessage = page.locator('#success-subscribe');
    }
}